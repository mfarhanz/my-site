<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
    import { MIN_WORD_FONT_SIZE, MAX_WORD_FONT_SIZE, WORD_SPAWN_INTERVAL } from '$lib/config';
    import { getWordSprite, getAtlasCanvas } from '$lib/utils/word-sprite-cache';
    import type { WordParticle } from '$lib/types/effect';

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
    console.log(WORDS.length);

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const context = canvas.getContext('2d');
		let width = window.innerWidth;
		let height = window.innerHeight;
		canvas.width = width;
		canvas.height = height;

		let lastSpawnTime = 0;
		let lastFrameTime = performance.now();
		const particles: WordParticle[] = [];
		let animationFrameId: number;

		function spawnParticle() {
			const w = WORDS[Math.floor(Math.random() * WORDS.length)];
			const fontSize = MIN_WORD_FONT_SIZE + Math.floor(Math.random() * MAX_WORD_FONT_SIZE);
			const opacity = 0.5 + Math.random() * 0.5;
			const rotation = Math.random() * Math.PI * 2;
			const rotationSpeed = (Math.random() * 0.02) - 0.01;
			const baseSpeed = 0.2 + Math.random() * 0.6;

			let x = 0, y = 0, vx = 0, vy = 0;
			const wW = width;
			const wH = height;
			const side = Math.floor(Math.random() * 4);

			switch (side) {
                case 0: // Top -> Bottom
                    x = Math.random() * wW;
                    y = -10;
                    vy = baseSpeed;
                    vx = (Math.random() * 0.1 - 0.05);
                    break;
                case 1: // Right -> Left
                    x = wW + 10;
                    y = Math.random() * wH;
                    vx = -baseSpeed;
                    vy = (Math.random() * 0.1 - 0.05);
                    break;
                case 2: // Bottom -> Top
                    x = Math.random() * wW;
                    y = wH + 10;
                    vy = -baseSpeed;
                    vx = (Math.random() * 0.1 - 0.05);
                    break;
                case 3: // Left -> Right
                    x = -10;
                    y = Math.random() * wH;
                    vx = baseSpeed;
                    vy = (Math.random() * 0.1 - 0.05);
                    break;
            }

			particles.push({ word: w, x, y, vx, vy, fontSize, opacity, rotation, rotationSpeed });
		}

		function update(currentTime: number) {
			if (!context) return;
            
			const deltaTime = currentTime - lastFrameTime;
			lastFrameTime = currentTime;

			context.clearRect(0, 0, width, height);

			const timeSinceLastSpawn = currentTime - lastSpawnTime;
			if (timeSinceLastSpawn > WORD_SPAWN_INTERVAL) {
				spawnParticle();
				lastSpawnTime = currentTime;
			}

			for (let i = particles.length - 1; i >= 0; i--) {
				const p = particles[i];

				p.x += p.vx * deltaTime / 16;
				p.y += p.vy * deltaTime / 16;
				p.rotation += p.rotationSpeed * deltaTime / 16;

                const atlas = getAtlasCanvas();
                const sprite = getWordSprite(p.word, p.fontSize);
                context.save();
                context.translate(p.x, p.y);
                context.rotate(p.rotation);
                context.globalAlpha = p.opacity;

                // Draw the pre-rendered word in offscreen canvas
                if (sprite) {
                    context.drawImage(
                        atlas,
                        sprite.x, sprite.y, sprite.width, sprite.height,
                        -sprite.width / 2, -sprite.height / 2,
                        sprite.width, sprite.height
                    );
                }
                context.restore();

				if (p.x < -100 || p.x > width + 100 || p.y < -100 || p.y > height + 100) {
					particles.splice(i, 1);
				}
			}

			animationFrameId = requestAnimationFrame(update);
		}

		function resizeCanvas() {
			width = window.innerWidth;
			height = window.innerHeight;
			canvas.width = width;
			canvas.height = height;
		}

		window.addEventListener('resize', resizeCanvas);
		animationFrameId = requestAnimationFrame(update);
        
		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener('resize', resizeCanvas);
		};
	});

    onDestroy(() => {
        // Clear the map to release all references to the offscreen canvases.
        // clearSpriteCache();
        console.log("FloatingWords cache cleared");
    });
</script>

<canvas bind:this={canvas} class="fixed inset-0 z-0 pointer-events-none"></canvas>
