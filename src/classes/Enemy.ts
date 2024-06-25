import { IDimensions } from "../interfaces/IDimensions";
import { IPlayer } from "../interfaces/IPlayer";
import { IPosition } from "../interfaces/IPosition";
import { ctx } from "../main";
import { collision, collisionGeneral } from "../utils/collision";
import { GRAVITY } from "../utils/constants";
import { adjustedColliders } from "../utils/spriteArrays/mapColliderArray";
import EnemyA from "./EnemyA";
import EnemyProjectile from "./EnemyProjectile";
import Sprite from "./Sprite";

export default class Enemy extends Sprite {
  damage: number;
  range: number;
  cooldown: number;
  cooldownCounter: number;
  projectiles: EnemyProjectile[];
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
    damage: number,
    range: number,
    cooldown: number,
    cooldownCounter: number
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
    this.range = range;
    this.cooldown = cooldown;
    this.cooldownCounter = cooldownCounter;
    this.projectiles = [];
  }

  update(player: IPlayer, enemies: EnemyA[], index: number) {
    this.cooldownCounter++;

    this.dy += GRAVITY;
    this.x += this.dx;
    this.y += this.dy;

    adjustedColliders.forEach((collider) => {
      if (collisionGeneral(this, collider)) {
        this.dy = 0;
        this.y = collider.y - this.height;
      }
    });
    this.projectileHit(player);
    if (this.hp <= 0) this.destroy(enemies, index);
  }

  draw() {
    super.draw();
  }

  destroy(enemies: EnemyA[], index: number) {
    enemies.splice(index, 1);
  }

  shouldShootProjectile(player: IPlayer) {
    let inRange: boolean = this.isFlipX
      ? player.x > this.x + this.range
      : player.x > this.x - this.range;
    if (this.cooldownCounter > this.cooldown && inRange) {
      this.cooldownCounter = 0;
      return true;
    }
  }

  projectileHit(player: IPlayer) {
    player.projectiles.forEach((projectile, index) => {
      if (
        collisionGeneral(
          {
            x: this.x + this.width - this.hitBox.width,
            y: this.y + this.height - this.hitBox.height,
            width: this.hitBox.width,
            height: this.hitBox.height,
          },
          projectile
        )
      ) {
        if (projectile.size === "small" || this.hp > projectile.damage)
          player.projectiles.splice(index, 1);
        this.hp -= projectile.damage;
      }
    });
  }
}
