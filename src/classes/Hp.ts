import { IPlayer } from "../interfaces/IPlayer";
import { ctx } from "../main";

export default class Hp {
  unitHeight: number;
  maxHeight: number;
  height: number;
  width: number;
  constructor() {
    this.unitHeight = 5;
    this.maxHeight = 0;
    this.height = 0;
    this.width = 10;
  }
  update(player: IPlayer) {
    this.maxHeight = this.unitHeight * player.maxHp;
    this.height = this.unitHeight * player.hp;
  }
  draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(10, 10, this.width, this.maxHeight);
    ctx.strokeRect(10, 10, this.width, this.maxHeight);
    ctx.fillStyle = "green";
    ctx.fillRect(
      10,
      10 + this.maxHeight - this.height,
      this.width,
      this.height
    );
  }
}
