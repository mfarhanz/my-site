import type { WordParticle, WorkerResponse, WorkerMessage, SpawnMessage } from '$lib/types/effect';
import { MIN_WORD_FONT_SIZE, MAX_WORD_FONT_SIZE } from '$lib/config';

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

function generateParticle(width: number, height: number): WordParticle {
    const w = WORDS[Math.floor(Math.random() * WORDS.length)];
    const fontSize = MIN_WORD_FONT_SIZE + Math.floor(Math.random() * MAX_WORD_FONT_SIZE);
    const opacity = 0.5 + Math.random() * 0.5;
    const rotation = Math.random() * Math.PI * 2;
    const rotationSpeed = (Math.random() * 0.02) - 0.01;
    const baseSpeed = 0.2 + Math.random() * 0.6;

    let x = 0, y = 0, vx = 0, vy = 0;
    const side = Math.floor(Math.random() * 4);

    switch (side) {
        case 0: x = Math.random() * width; y = -10; vy = baseSpeed; vx = (Math.random() * 0.1 - 0.05); break;
        case 1: x = width + 10; y = Math.random() * height; vx = -baseSpeed; vy = (Math.random() * 0.1 - 0.05); break;
        case 2: x = Math.random() * width; y = height + 10; vy = -baseSpeed; vx = (Math.random() * 0.1 - 0.05); break;
        case 3: x = -10; y = Math.random() * height; vx = baseSpeed; vy = (Math.random() * 0.1 - 0.05); break;
    }

    return { word: w, x, y, vx, vy, fontSize, opacity, rotation, rotationSpeed };
}

self.onmessage = (event: MessageEvent<WorkerMessage | SpawnMessage>) => {
    if (event.data.type === 'spawn') {
        const newParticle = generateParticle(event.data.width, event.data.height);
        const msg: WorkerResponse = { type: 'particles', particles: [newParticle] };
        self.postMessage(msg);
        return;
    }

    // normal update
    const { deltaTime, width, height, particles, spawnNew } = event.data as WorkerMessage;

    const updatedParticles = particles.map(p => {
        p.x += p.vx * deltaTime / 16;
        p.y += p.vy * deltaTime / 16;
        p.rotation += p.rotationSpeed * deltaTime / 16;
        return p;
    }).filter(p => p.x >= -100 && p.x <= width + 100 && p.y >= -100 && p.y <= height + 100);

    if (spawnNew) {
        updatedParticles.push(generateParticle(width, height));
    }

    const msg: WorkerResponse = { type: 'particles', particles: updatedParticles, spawned: spawnNew };
    self.postMessage(msg);
};
