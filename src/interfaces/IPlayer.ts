import EnemyA from "../classes/EnemyA";
import Projectile from "../classes/Projectile";
import { ISolidObject } from "./ISolidObject";
import { ISprite } from "./ISprite";

export interface IPlayer extends ISprite {
  hp: number;
  spriteWidth: number;
  lives: number;
  currentState: string;
  dashDistance: number;
  jumpForce: number;
  isWallClimb: boolean;
  isCharging: boolean;
  isShooting: boolean;
  isJumping: boolean;
  isGoingRight: boolean;
  dashLimit: number;
  dashSpeed: number;
  isDashing: boolean;
  shootInterval: number;
  maxShootInterval: number;
  cameraBox: ISolidObject;
  chargeTime: number;
  immortalityFrames: number;
  immortalityFrameCount: number;
  projectiles: Projectile[];
  recoil: number;
  maxHp: number;

  shoot: (isShooting: boolean) => void;
  charge: (isCharging: boolean) => void;
  wallClimb: (isWallClimb: boolean) => void;
  draw: () => void;
  update: (enemies: EnemyA[]) => void;
}
