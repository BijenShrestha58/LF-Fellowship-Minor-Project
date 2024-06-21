import { IDimensions } from "./IDimensions";
import { ISprite } from "./ISprite";

export interface IPlayer extends ISprite {
  hp: number;
  spriteWidth: number;
  lives: number;
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
  hitBox: IDimensions;

  shoot: (isShooting: boolean) => void;
  charge: (isCharging: boolean) => void;
  wallClimb: (isWallClimb: boolean) => void;
  draw: () => void;
  update: () => void;
}
