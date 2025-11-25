import { ATLAS_SIZE } from '$lib/config/constants';
import type { WordSprite } from '$lib/types/effect';

const spriteCache = new Map<string, WordSprite>();

let atlas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;

let penX = 0;
let penY = 0;
let lineH = 0;

function ensureAtlas() {
    if (atlas) return;
    atlas = document.createElement('canvas');
    atlas.width = ATLAS_SIZE;
    atlas.height = ATLAS_SIZE;
    ctx = atlas.getContext('2d');
}

function placeInAtlas(w: number, h: number) {
    if (penX + w > ATLAS_SIZE) {
        penX = 0;
        penY += lineH;
        lineH = 0;
    }
    if (penY + h > ATLAS_SIZE) return null;
    const x = penX;
    const y = penY;
    penX += w;
    if (h > lineH) lineH = h;
    return { x, y };
}

export function getAtlasCanvas() {
    ensureAtlas();
    return atlas!;
}

export function getWordSprite(word: string, fontSize: number): WordSprite | null {
    ensureAtlas();

    const key = `${word}_${fontSize}`;
    if (spriteCache.has(key)) return spriteCache.get(key)!;

    const c = ctx!;
    c.font = `${fontSize}px 'Fira Code', monospace`;
    const m = c.measureText(word);
    const w = Math.ceil(m.width);
    const h = Math.ceil(fontSize * 1.2);

    const pos = placeInAtlas(w, h);
    if (!pos) return null;

    c.font = `${fontSize}px 'Fira Code', monospace`;
    c.fillStyle = '#8b5cf6';
    c.textBaseline = 'top';
    c.fillText(word, pos.x, pos.y);

    const sprite = { x: pos.x, y: pos.y, width: w, height: h };
    spriteCache.set(key, sprite);
    return sprite;
}

// export function clearSpriteCache() {
//     spriteCache.clear();
//     if (ctx) ctx.clearRect(0, 0, ATLAS_SIZE, ATLAS_SIZE);
//     penX = 0;
//     penY = 0;
//     lineH = 0;
// }
