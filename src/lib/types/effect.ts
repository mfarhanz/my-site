export type WordParticle = {
    word: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    fontSize: number;
    opacity: number;
    rotation: number;
    rotationSpeed: number;
};

export type WordSprite = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export interface WorkerMessage {
  type: 'update';
  deltaTime: number;
  width: number;
  height: number;
  particles: WordParticle[];
  spawnNew: boolean;
}

export interface WorkerResponse {
  type: 'particles';
  particles: WordParticle[];
  spawned?: boolean; // optional
}

export interface SpawnMessage {
  type: 'spawn';
  width: number;
  height: number;
}