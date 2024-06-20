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
  shoot: (isShooting: boolean) => void;
  charge: (isCharging: boolean) => void;
  wallClimb: (isWallClimb: boolean) => void;
  draw: () => void;
  update: () => void;
}
