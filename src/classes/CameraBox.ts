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
  offsetX: number;
  offsetY: number;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = CANVAS_DIMENSIONS.WIDTH;
    this.height = 150;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  panCameraLeft(player: IPlayer) {
    const cameraBoxRightSide = this.x + this.width;

    for (let i = 0; i < panStoppers.length; i++) {
      if (
        cameraBoxRightSide >= panStoppers[i] + MAP_OFFSET.X &&
        player.x <= panStoppers[i] + MAP_OFFSET.X
      )
        return;
    }
    if (player.x >= CANVAS_DIMENSIONS.WIDTH + this.offsetX) {
      ctx.translate(
        -(cameraBoxRightSide - (CANVAS_DIMENSIONS.WIDTH + this.offsetX)),
        0
      );
      this.offsetX +=
        cameraBoxRightSide - (CANVAS_DIMENSIONS.WIDTH + this.offsetX);
    }
    if (cameraBoxRightSide >= CANVAS_DIMENSIONS.WIDTH + this.offsetX) {
      this.offsetX += player.dx;
      ctx.translate(-player.dx, 0);
    }
  }

  panCameraRight(player: IPlayer) {
    const cameraBoxLeftSide = this.x;

    // for (let i = 0; i < panStoppers.length; i++) {
    //   if (
    //     cameraBoxLeftSide >= panStoppers[i] + MAP_OFFSET.X &&
    //     player.x <= panStoppers[i] + MAP_OFFSET.X
    //   )
    //     return;
    // }
    // if (player.x >= CANVAS_DIMENSIONS.WIDTH + this.offsetX) {
    //   ctx.translate(
    //     -(cameraBoxLeftSide - (CANVAS_DIMENSIONS.WIDTH + this.offsetX)),
    //     0
    //   );
    //   this.offsetX +=
    //     cameraBoxLeftSide - (CANVAS_DIMENSIONS.WIDTH + this.offsetX);
    // }
    if (cameraBoxLeftSide <= this.offsetX) {
      this.offsetX += player.dx;
      ctx.translate(-player.dx, 0);
    }
  }

  panCameraUp(player: IPlayer) {
    if (this.y + this.height >= CANVAS_DIMENSIONS.HEIGHT + this.offsetY) {
      ctx.translate(0, -player.dy);
      this.offsetY += player.dy;
    }
  }

  panCameraDown(player: IPlayer) {
    if (this.y < this.offsetY) {
      ctx.translate(0, -player.dy);
      this.offsetY += player.dy;
    }
  }

  update(player: IPlayer) {
    this.x = player.x - CANVAS_DIMENSIONS.WIDTH / 2 + PLAYER_HIT_BOX.WIDTH / 2;
    this.y = player.y - 50;
    if (player.dx >= 0) {
      this.panCameraLeft(player);
    } else {
      this.panCameraRight(player);
    }

    if (player.dy >= 0) {
      this.panCameraUp(player);
    } else {
      this.panCameraDown(player);
    }
  }

  draw() {
    // ctx.fillStyle = "rgba(0,0,255,0.9)";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    // ctx.fillRect(
    //   CANVAS_DIMENSIONS.WIDTH - 20 + this.offsetX,
    //   this.y - 20,
    //   20,
    //   20
    // );
  }
}
