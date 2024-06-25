import { weaponData } from "../constants/weaponData";
import { ctx } from "../main";
import { weapons } from "../main";

export default class Projectile {
  image: HTMLImageElement;
  isFlipX: boolean;
  x: number;
  y: number;
  dx: number;
  dy: number;
  width: number;
  height: number;
  damage: number;
  size: string;
  animationFrames: { x: number; y: number; width: number; height: number }[];
  currentFrameIndex: number;

  constructor(
    isFlipX: boolean,
    x: number,
    y: number,
    dx: number,
    dy: number,
    size: string
  ) {
    this.isFlipX = isFlipX;
    this.x = x;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    this.height = 0;
    this.width = 0;
    this.image = weapons;
    this.animationFrames = [{ x: 0, y: 0, width: 5, height: 5 }];
    this.currentFrameIndex = 0;

    const weapon = weaponData.find((w) => w.name === size);
    if (weapon) {
      this.animationFrames = weapon.pos;
    }

    switch (size) {
      case "small":
        this.damage = 1;
        this.width = 8;
        this.height = 6;

        break;
      case "medium":
        this.damage = 1.5;
        this.width = 41;
        this.height = 24;
        break;
      case "large":
        this.damage = 3;
        this.width = 42;
        this.height = 33;
        break;
      default:
        this.damage = 1;
    }
    this.y = y - this.height / 2;
  }

  update() {
    this.x += this.dx;

    // Update animation frame
    this.currentFrameIndex++;
    if (this.currentFrameIndex >= this.animationFrames.length - 1) {
      this.currentFrameIndex =
        this.animationFrames.length - 2 > 0
          ? this.animationFrames.length - 2
          : this.animationFrames.length - 1; // Cycle between the last two frames
    }
  }
  draw() {
    const frame = this.animationFrames[this.currentFrameIndex];
    ctx.save();

    // Translate and scale context if flipping horizontally
    if (this.isFlipX) {
      ctx.scale(-1, 1); // Flip horizontally
      ctx.drawImage(
        this.image,
        frame.x,
        frame.y,
        frame.width,
        frame.height,
        -this.x - frame.width, // Adjust x position for flipped drawing
        this.y,
        frame.width,
        frame.height
      );
    } else {
      ctx.drawImage(
        this.image,
        frame.x,
        frame.y,
        frame.width,
        frame.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    ctx.restore();
  }
}
