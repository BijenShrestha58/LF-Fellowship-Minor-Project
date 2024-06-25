import { ctx } from "../main";

export default class Projectile {
  x: number;
  y: number;
  dx: number;
  dy: number;
  width: number;
  height: number;
  color: string;
  damage: number;
  size: string;

  constructor(x: number, y: number, dx: number, dy: number, size: string) {
    this.x = x;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    switch (size) {
      case "small":
        this.width = 5;
        this.height = 5;
        this.color = "red";
        this.damage = 1;
        break;
      case "medium":
        this.width = 10;
        this.height = 10;
        this.color = "orange";
        this.damage = 1.5;
        break;
      case "large":
        this.width = 20;
        this.height = 20;
        this.color = "yellow";
        this.damage = 3;
        break;
      default:
        this.width = 5;
        this.height = 5;
        this.color = "red";
        this.damage = 1;
    }
    this.y = y - this.height / 2;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
