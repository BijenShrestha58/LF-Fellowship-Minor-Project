import { IDimensions } from "../interfaces/IDimensions";
import { IPosition } from "../interfaces/IPosition";
import { ISprite } from "../interfaces/ISprite";
import { STAGGER_FRAMES } from "../utils/constants";
import { ctx } from "../main";

export default class Sprite implements ISprite {
  image: HTMLImageElement;
  spriteX: number;
  spriteY: number;
  spriteWidth: number;
  spriteHeight: number;
  x: number;
  y: number;
  width: number;
  height: number;
  spriteCount: number; //number of sprites in animation
  frameX: number; //frame count in x-direction
  gameFrame: number; //counts number of frames elapsed
  dy: number;
  descent: boolean;

  constructor(
    image: HTMLImageElement,
    spritePosition: IPosition,
    spriteDimensions: IDimensions,
    position: IPosition,
    dimensions: IDimensions,
    spriteCount: number,
    frameX: number,
    gameFrame: number,
    dy: number,
    descent: boolean
  ) {
    this.image = image;
    this.spriteX = spritePosition.x;
    this.spriteY = spritePosition.y;
    this.spriteWidth = spriteDimensions.width;
    this.spriteHeight = spriteDimensions.height;
    this.x = position.x;
    this.y = position.y;
    this.width = dimensions.width;
    this.height = dimensions.height;
    this.spriteCount = spriteCount;
    this.frameX = frameX;
    this.gameFrame = gameFrame;
    this.dy = dy;
    this.descent = descent;
  }

  get spriteSelect(): number {
    return Math.floor(this.gameFrame / STAGGER_FRAMES);
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.spriteX,
      this.spriteY,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
