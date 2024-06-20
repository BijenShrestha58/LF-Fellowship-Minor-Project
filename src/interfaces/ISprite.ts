import { IDimensions } from "./IDimensions";
import { IPosition } from "./IPosition";

export interface ISprite extends IPosition, IDimensions {
  spriteX: number;
  spriteY: number;
  spriteWidth: number;
  spriteHeight: number;
  spriteCount: number;
  frameX: number;
  gameFrame: number;
  dy: number;
  descent: boolean;
  isFlipX: boolean;
}
