import { env } from '$env/dynamic/private';

// Convert Uint8Array or ArrayBuffer to hex
function toHex(buffer: ArrayBuffer | Uint8Array) {
    const arr = buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : buffer;
    return Array.from(arr)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
}

async function createNonce(): Promise<string> {
    // 1. Generate 16 random bytes
    const rand = new Uint8Array(16);
    crypto.getRandomValues(rand);
    const payload = toHex(rand);

    // 2. Encode the secret key
    const secretBuffer = new TextEncoder().encode(env.NONCE_SECRET);

    // 3. Import key for HMAC-SHA256
    const key = await crypto.subtle.importKey(
        'raw',
        secretBuffer,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );

    // 4. Sign the payload
    const dataToSign = new TextEncoder().encode(payload);
    const signatureBuffer = await crypto.subtle.sign('HMAC', key, dataToSign);

    // 5. Convert signature to hex and return
    const signature = toHex(signatureBuffer);
    return `${payload}.${signature}`;
}

export async function load() {
    return {
        nonce: await createNonce()
    };
}
