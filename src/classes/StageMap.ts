import { IStageMap } from "../interfaces/IStageMap";
import { ctx } from "../main";
import { MAP_OFFSET } from "../constants/general";
import { BG_DIMENSIONS } from "../constants/general";

export default class StageMap implements IStageMap {
  image: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(image: HTMLImageElement) {
    this.image = image;
    this.x = MAP_OFFSET.X;
    this.y = MAP_OFFSET.Y;
    this.width = BG_DIMENSIONS.WIDTH;
    this.height = BG_DIMENSIONS.HEIGHT;
  }
  update() {}
  draw() {
    ctx.save();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.restore();
  }
}
