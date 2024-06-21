import { IStageMap } from "../interfaces/IStageMap";
import { ctx } from "../main";
import { CANVAS_DIMENSIONS } from "../utils/constants";
import { mapColliderArray } from "../utils/spriteArrays/mapColliderArray";

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
  update() {}
  draw() {
    ctx.save();
    ctx.translate(
      -CANVAS_DIMENSIONS.WIDTH,
      -this.image.height + CANVAS_DIMENSIONS.HEIGHT * 3.5
    );
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    mapColliderArray.forEach((collider) => {
      ctx.fillStyle = "red";
      ctx.fillRect(collider.x, collider.y, collider.width, collider.height);
    });
    ctx.restore();
    console.log(this.y);
  }
}
