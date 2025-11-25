<script lang="ts">
	import { onMount } from 'svelte';
	import { WORD_SPAWN_INTERVAL, FRAME_SKIP } from '$lib/config/constants';
	import { getWordSprite, getAtlasCanvas } from '$lib/utils/word-sprite';
	import type { WordParticle, WorkerResponse } from '$lib/types/effect';
	
	export let enabled: boolean;
	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D | null;
	let particles: WordParticle[] = [];
	let frameCounter = 0;
	let lastSpawnTime = 0;
	let lastFrameTime = performance.now();
	let animationFrameId: number;
	let width: number;
	let height: number;
	let mounted = false;
	let running = false;
	let worker: Worker;

	$: if (mounted) {
		if (enabled && !running) {
			running = true;
			animationFrameId = requestAnimationFrame(update);
		}

		if (!enabled && running) {
			running = false;
			particles.length = 0;
			cancelAnimationFrame(animationFrameId);
		}
	}

	function update(currentTime: number) {
		if (!running || !context) return;

		frameCounter = (frameCounter + 1) % (FRAME_SKIP + 1);
		if (frameCounter !== 0) {
			animationFrameId = requestAnimationFrame(update);
			return;
		}

		const atlas = getAtlasCanvas();
		const deltaTime = currentTime - lastFrameTime;
		lastFrameTime = currentTime;

		// call worker to update particle positions & optionally spawn a new one
		worker.postMessage({
			type: 'update',
			deltaTime,
			width,
			height,
			particles,
			spawnNew: currentTime - lastSpawnTime > WORD_SPAWN_INTERVAL
		});

		context.clearRect(0, 0, width, height);
		if (!enabled) return;

		// draw whatever particles are currently in the main thread array
		for (const p of particles) {
			const sprite = getWordSprite(p.word, p.fontSize);
			context.save();
			context.translate(p.x, p.y);
			context.rotate(p.rotation);
			context.globalAlpha = p.opacity;
			if (sprite) {
				context.drawImage(
					atlas,
					sprite.x,
					sprite.y,
					sprite.width,
					sprite.height,
					-sprite.width / 2,
					-sprite.height / 2,
					sprite.width,
					sprite.height
				);
			}

			context.restore();
		}

		animationFrameId = requestAnimationFrame(update);
	}

	function resizeCanvas() {
		width = window.innerWidth;
		height = window.innerHeight;
		canvas.width = width;
		canvas.height = height;
	}

	onMount(() => {
		// run the heavy CPU stuff used in the background effect's logic via a webworker
		worker = new Worker(new URL('$lib/workers/particle-worker.ts', import.meta.url), {
			type: 'module'
		});

		worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
			if (event.data.type === 'particles') {
				particles = [...event.data.particles];
				if (event.data.spawned) lastSpawnTime = performance.now();
			}
		};

		context = canvas.getContext('2d');
		width = window.innerWidth;
		height = window.innerHeight;
		canvas.width = width;
		canvas.height = height;
		mounted = true;

		window.addEventListener('resize', resizeCanvas);

		return () => {
			mounted = false;
			// cancelAnimationFrame(animationFrameId);	// needed?
			window.removeEventListener('resize', resizeCanvas);
		};
	});
</script>

<canvas
	bind:this={canvas}
	class="pointer-events-none fixed inset-0 z-0 {enabled ? '' : 'opacity-0'}"
></canvas>
