import { IDimensions } from "../interfaces/IDimensions";
import { IPlayer } from "../interfaces/IPlayer";
import { IPosition } from "../interfaces/IPosition";
import { collisionGeneral } from "../utils/collision";
import { GRAVITY } from "../constants/general";
import { adjustedColliders } from "../constants/mapColliderArray";
import DropItem from "./DropItem";
import EnemyA from "./EnemyA";
import EnemyB from "./EnemyB";
import EnemyC from "./EnemyC";
import EnemyProjectile from "./EnemyProjectile";
import Sprite from "./Sprite";

export default class Enemy extends Sprite {
  damage: number;
  range: number;
  cooldown: number;
  cooldownCounter: number;
  projectiles: EnemyProjectile[];
  noGravity: boolean;
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
    cooldownCounter: number,
    noGravity: boolean
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
    this.noGravity = noGravity;
  }

  update(
    player: IPlayer,
    enemies: (EnemyA | EnemyB | EnemyC)[],
    dropItems: DropItem[],
    index: number
  ) {
    this.cooldownCounter++;

    if (!this.noGravity) {
      this.dy += GRAVITY;
      this.x += this.dx;
      this.y += this.dy;

      adjustedColliders.forEach((collider) => {
        if (collisionGeneral(this, collider)) {
          this.dy = 0;
          this.y = collider.y - this.height;
        }
      });
    }

    this.projectileHit(player);
    if (this.hp <= 0) this.destroy(enemies, dropItems, index);
  }

  draw() {
    super.draw();
  }

  destroy(
    enemies: (EnemyA | EnemyB | EnemyC)[],
    dropItems: DropItem[],
    index: number
  ) {
    enemies.splice(index, 1);
    if (Math.random() < 0.2) {
      const dropItem = new DropItem(
        { x: this.x, y: this.y + this.height - 20 },
        { width: 16, height: 12 },
        5
      );

      dropItems.push(dropItem);
    }
  }

  shouldShootProjectile(player: IPlayer) {
    let inRange: boolean =
      player.x < this.x + this.range && player.x > this.x - this.range;
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
