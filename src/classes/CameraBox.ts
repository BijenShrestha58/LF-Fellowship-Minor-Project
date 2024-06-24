import { IPlayer } from "../interfaces/IPlayer";
import { ISolidObject } from "../interfaces/ISolidObject";
import { ctx } from "../main";
import {
  CANVAS_DIMENSIONS,
  MAP_OFFSET,
  PLAYER_HIT_BOX,
} from "../utils/constants";
import { panStoppers } from "../utils/spriteArrays/panStoppers";

export default class CameraBox implements ISolidObject {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = CANVAS_DIMENSIONS.WIDTH;
    this.height = 80;
  }

  panCameraHorizontal(player: IPlayer) {
    const cameraBoxRightSide = this.x + this.width;

    for (let i = 0; i < panStoppers.length; i++) {
      if (
        cameraBoxRightSide >= panStoppers[i] + MAP_OFFSET.X &&
        player.x <= panStoppers[i] + MAP_OFFSET.X
      )
        return;
    }

    if (cameraBoxRightSide >= CANVAS_DIMENSIONS.WIDTH) {
      ctx.translate(-player.dx, 0);
    }
  }

  panCameraVertical(player: IPlayer) {
    if (this.y + this.height >= CANVAS_DIMENSIONS.HEIGHT)
      ctx.translate(0, -player.dy);
  }

  update(player: IPlayer) {
    this.x = player.x - CANVAS_DIMENSIONS.WIDTH / 2 + PLAYER_HIT_BOX.WIDTH / 2;
    this.y = player.y;

    this.panCameraHorizontal(player);
    this.panCameraVertical(player);
  }

  draw() {
    // ctx.fillStyle = "rgba(0,0,255,0.9)";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
