import { IDimensions } from "../interfaces/IDimensions";
import { IPlayer } from "../interfaces/IPlayer";
import { IPosition } from "../interfaces/IPosition";
import { ctx } from "../main";
import { collisionGeneral } from "../utils/collision";
import Sprite from "./Sprite";

export default class Enemy extends Sprite {
  damage: number;
  constructor(
    image: HTMLImageElement,
    spritePosition: IPosition,
    spriteDimensions: IDimensions,
    position: IPosition,
    dimensions: IDimensions,
    spriteCount: number,
    frameX: number,
    gameFrame: number,
    dx: number,
    dy: number,
    descent: boolean,
    isFlipX: boolean,
    hitBox: IDimensions,
    hp: number,
    damage: number
  ) {
    super(
      image,
      spritePosition, //position in spritesheet
      spriteDimensions, //dimensions in spritesheet
      position, //position
      dimensions, //dimensions
      spriteCount, //spriteCount
      frameX, //frameX
      gameFrame, //gameFrame
      dx, //dx
      dy, //dy
      descent, //descent
      isFlipX, //isFlipX
      hitBox, //hitbox
      hp //hp
    );
    this.damage = damage;
  }

  update() {
    // Example movement logic, can be replaced with specific enemy behavior
    this.x += this.dx;
    this.y += this.dy;

    // Add gravity, collision checks, and other logic here
  }

  draw() {
    super.draw();
  }

  takeDamage(amount: number) {
    this.hp -= amount;
    if (this.hp <= 0) {
      this.destroy();
    }
  }

  destroy() {
    // Logic for removing the enemy from the game
  }

  checkCollision(player: IPlayer, damage: number) {
    if (collisionGeneral(this, player)) {
      player.hp -= damage;
    }
  }
}
