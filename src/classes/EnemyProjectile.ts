import { ctx } from "../main";
import { GRAVITY } from "../constants/general";

export default class EnemyProjectile {
  image: HTMLImageElement;
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  width: number;
  height: number;
  damage: number;
  constructor(
    image: HTMLImageElement,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    x: number,
    y: number,
    dx: number,
    dy: number,
    width: number,
    height: number,
    damage: number
  ) {
    this.image = image;
    this.sx = sx;
    this.sy = sy;
    this.sw = sw;
    this.sh = sh;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = width;
    this.height = height;
    this.damage = damage;
  }
  update() {
    this.dy += GRAVITY;
    this.x += this.dx;
    this.y += this.dy;
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.sx,
      this.sy,
      this.sw,
      this.sh,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
