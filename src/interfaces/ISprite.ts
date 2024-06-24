import { IDimensions } from "./IDimensions";
import { ISolidObject } from "./ISolidObject";

export interface ISprite extends ISolidObject {
  hp: number;
  spriteX: number;
  spriteY: number;
  spriteWidth: number;
  spriteHeight: number;
  spriteCount: number;
  frameX: number;
  gameFrame: number;
  dx: number;
  dy: number;
  descent: boolean;
  isFlipX: boolean;
  hitBox: IDimensions;
}
