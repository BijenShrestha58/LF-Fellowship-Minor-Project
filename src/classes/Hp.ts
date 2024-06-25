import { ctx } from "../main";
import Player from "./Player";

export default class Hp {
  unitHeight: number;
  maxHeight: number;
  height: number;
  width: number;
  x: number;
  y: number;
  constructor() {
    this.unitHeight = 5;
    this.maxHeight = 0;
    this.height = 0;
    this.width = 10;
    this.x = 0;
    this.y = 0;
  }
  update(player: Player) {
    this.maxHeight = this.unitHeight * player.maxHp;
    this.height = this.unitHeight * player.hp;
    this.x = 10 + player.cameraBox.offsetX;
    this.y = 10 + player.cameraBox.offsetY;
  }
  draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.maxHeight);
    ctx.strokeRect(this.x, this.y, this.width, this.maxHeight);
    ctx.fillStyle = "green";

    ctx.fillRect(
      this.x,
      this.y + this.maxHeight - this.height,
      this.width,
      this.height
    );
    for (
      let i = this.maxHeight / this.unitHeight;
      i > this.maxHeight / this.unitHeight - this.height / this.unitHeight;
      i--
    ) {
      ctx.strokeRect(
        this.x,
        this.y + this.unitHeight * (i - 1),
        this.width,
        this.unitHeight
      );
    }
  }
}
