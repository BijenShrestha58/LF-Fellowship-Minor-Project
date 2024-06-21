import { IStageMap } from "../interfaces/IStageMap";
import { ctx } from "../main";
// import { CANVAS_DIMENSIONS } from "../utils/constants";

export default class StageMap implements IStageMap {
  image: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
  constructor(image: HTMLImageElement) {
    this.image = image;
    this.x = 0;
    this.y = 0;
    this.width = 4894;
    this.height = 2172;
  }
  // update() {}
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
