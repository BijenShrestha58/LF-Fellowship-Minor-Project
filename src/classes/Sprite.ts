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
  dx: number;
  dy: number;
  descent: boolean;
  isFlipX: boolean;
  hitBox: IDimensions;
  hp: number;

  constructor(
    image: HTMLImageElement,
    spritePosition: IPosition,
    spriteDimensions: IDimensions,
    position: IPosition,
    dimensions: IDimensions,
    spriteCount: number,
    frameX: number,
    gameFrame: number,
    dx: number,
    dy: number,
    descent: boolean,
    isFlipX: boolean,
    hitBox: IDimensions,
    hp: number
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
    this.dx = dx;
    this.dy = dy;
    this.descent = descent;
    this.isFlipX = isFlipX;
    this.hitBox = {
      width: hitBox.width,
      height: hitBox.height,
    };
    this.hp = hp;
  }

  get spriteSelect(): number {
    return Math.floor(this.gameFrame / STAGGER_FRAMES);
  }

  draw() {
    ctx.save();
    if (this.isFlipX) {
      ctx.scale(-1, 1); // Flip horizontally
      ctx.drawImage(
        this.image,
        this.spriteX,
        this.spriteY,
        this.spriteWidth,
        this.spriteHeight,
        -this.x - this.width, // Adjust x position for flipped sprite
        this.y,
        this.width,
        this.height
      );
    } else {
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

    ctx.restore();
  }
}
