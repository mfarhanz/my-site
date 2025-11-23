<script lang="ts">
	import { onMount } from 'svelte';
    import { MIN_WORD_FONT_SIZE, MAX_WORD_FONT_SIZE, WORD_SPAWN_INTERVAL, FRAME_SKIP } from '$lib/config';
    import { getWordSprite, getAtlasCanvas } from '$lib/utils/word-sprite';
    import type { WordParticle, WorkerResponse } from '$lib/types/effect';

    // related to python, java, c#
	const WORDS = [
		'lambda','async','await', 'Promise.all', 'tkinter', 'ndarray', 'Dataframe',
		'elif','try...except','finally', '[x for x in range(99)]', 'BufferedReader', 'LINQ', 'pickle',
        'mmap', 'request', 'response', 'UUID', 'ArrayList<>', 'HashMap<>()', 'TypeError', 'NullPointerException',
		'nonlocal','True','False','None','int64','str','list','dict','set','len','range(100,0,-1)', 'ref', 'byte*',
		'enumerate()','abs','type()', '@decorator', '@Repository', '@Getter', 'interface', 'internal', 'readonly',
		'float32','self','cls','__init__','__repr__', 'sealed', 'unsafe', 'LocalDateTime', 'Bitmap', 'HttpClient',
		'i','j','k','x','y','z','temp', 'args','kwargs','i+=1','B===D', 'PIL', 'Task<bool>', 'dynamic[]', 'Marshal.Copy',
		'!=','<=','>=','2**10', '256', '1024', 'struct', 'foreach', 'volatile', 'uint', 'np.zeros', 'Iterable', 'dict.item()',
        'prange', 'tuple()', 'float32[i,j][:]', 'float32[:,:,0]', '@njit', 'ndarray.shape', 'dtype', 'len()', 'continue', 'np.reshape(x,y)',
        'isinstance(var,type)', 'np.stack', '*tuple', 'np.fft', 'np.clip', 'str.strip()', 're.findall', 'f-string', '[].append(val)',
        'list[5:]', '{}.items()', 'for x in list:', 'perf_counter()', 'sleep()', 'torch.no_grad()', 'os.listdir', 'json.dumps', 
        'canvas.bind', 'Image.open()', 'root.mainloop()', 'Tk()', 'ndarray[~mask]', 'np.uint8', 'sys.stdout.flush()', 'str.startswith', 
        'thread.start()', 'def __init__(self)', 'print(val,end=\'\')', '1//2', '\\033[0m', 'func(*args,**kwargs)', 'pass'
	];

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

    const deltaTime = currentTime - lastFrameTime;
    lastFrameTime = currentTime;

    // Ask worker to update particle positions & optionally spawn a new one
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

    // Draw whatever particles are currently in the main thread array
    for (const p of particles) {
        const atlas = getAtlasCanvas();
        const sprite = getWordSprite(p.word, p.fontSize);
        context.save();
        context.translate(p.x, p.y);
        context.rotate(p.rotation);
        context.globalAlpha = p.opacity;

        if (sprite) {
            context.drawImage(
                atlas,
                sprite.x, sprite.y, sprite.width, sprite.height,
                -sprite.width / 2, -sprite.height / 2,
                sprite.width, sprite.height
            );
        }

        context.restore();
    }

    animationFrameId = requestAnimationFrame(update);
}



	// function update(currentTime: number) {
	// 	if (!running || !context) return;

	// 	frameCounter = (frameCounter + 1) % (FRAME_SKIP + 1);
	// 	if (frameCounter !== 0) {
	// 		animationFrameId = requestAnimationFrame(update);
	// 		return; // skip updates on this frame
	// 	}

	// 	const deltaTime = currentTime - lastFrameTime;
	// 	lastFrameTime = currentTime;

	// 	context.clearRect(0, 0, width, height);

	// 	if (!enabled) return;	// ...this is really not needed...cancelAnimationFrame takes care of stopping update

	// 	const timeSinceLastSpawn = currentTime - lastSpawnTime;
	// 	if (timeSinceLastSpawn > WORD_SPAWN_INTERVAL) {
	// 		spawnParticle();
	// 		lastSpawnTime = currentTime;
	// 	}

	// 	for (let i = particles.length - 1; i >= 0; i--) {
	// 		const p = particles[i];

	// 		p.x += p.vx * deltaTime / 16;
	// 		p.y += p.vy * deltaTime / 16;
	// 		p.rotation += p.rotationSpeed * deltaTime / 16;

	// 		const atlas = getAtlasCanvas();
	// 		const sprite = getWordSprite(p.word, p.fontSize);
	// 		context.save();
	// 		context.translate(p.x, p.y);
	// 		context.rotate(p.rotation);
	// 		context.globalAlpha = p.opacity;

	// 		// Draw the pre-rendered word in offscreen canvas
	// 		if (sprite) {
	// 			context.drawImage(
	// 				atlas,
	// 				sprite.x, sprite.y, sprite.width, sprite.height,
	// 				-sprite.width / 2, -sprite.height / 2,
	// 				sprite.width, sprite.height
	// 			);
	// 		}
	// 		context.restore();

	// 		if (p.x < -100 || p.x > width + 100 || p.y < -100 || p.y > height + 100) {
	// 			particles.splice(i, 1);
	// 		}
	// 	}

	// 	animationFrameId = requestAnimationFrame(update);
	// }
	
	// function spawnParticle() {
	// 	const w = WORDS[Math.floor(Math.random() * WORDS.length)];
	// 	const fontSize = MIN_WORD_FONT_SIZE + Math.floor(Math.random() * MAX_WORD_FONT_SIZE);
	// 	const opacity = 0.5 + Math.random() * 0.5;
	// 	const rotation = Math.random() * Math.PI * 2;
	// 	const rotationSpeed = (Math.random() * 0.02) - 0.01;
	// 	const baseSpeed = 0.2 + Math.random() * 0.6;

	// 	let x = 0, y = 0, vx = 0, vy = 0;
	// 	const wW = width;
	// 	const wH = height;
	// 	const side = Math.floor(Math.random() * 4);

	// 	switch (side) {
	// 		case 0: // Top -> Bottom
	// 			x = Math.random() * wW;
	// 			y = -10;
	// 			vy = baseSpeed;
	// 			vx = (Math.random() * 0.1 - 0.05);
	// 			break;
	// 		case 1: // Right -> Left
	// 			x = wW + 10;
	// 			y = Math.random() * wH;
	// 			vx = -baseSpeed;
	// 			vy = (Math.random() * 0.1 - 0.05);
	// 			break;
	// 		case 2: // Bottom -> Top
	// 			x = Math.random() * wW;
	// 			y = wH + 10;
	// 			vy = -baseSpeed;
	// 			vx = (Math.random() * 0.1 - 0.05);
	// 			break;
	// 		case 3: // Left -> Right
	// 			x = -10;
	// 			y = Math.random() * wH;
	// 			vx = baseSpeed;
	// 			vy = (Math.random() * 0.1 - 0.05);
	// 			break;
	// 	}
		
	// 	particles.push({ word: w, x, y, vx, vy, fontSize, opacity, rotation, rotationSpeed });
	// }

	function resizeCanvas() {
		width = window.innerWidth;
		height = window.innerHeight;
		canvas.width = width;
		canvas.height = height;
	}

	onMount(() => {
		worker = new Worker(new URL('$lib/workers/particleWorker.ts', import.meta.url), { type: 'module' });
  
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

<canvas bind:this={canvas} class="fixed inset-0 z-0 pointer-events-none {enabled ? '' : 'opacity-0'}"></canvas>
