import { IDimensions } from "../interfaces/IDimensions";
import { IPlayer } from "../interfaces/IPlayer";
import { IPosition } from "../interfaces/IPosition";
import { CANVAS_DIMENSIONS, STAGGER_FRAMES } from "../constants/general";
import Enemy from "./Enemy";
import { enemyCSpritePositions } from "../constants/enemyCData";
import EnemyProjectile from "./EnemyProjectile";
import DropItem from "./DropItem";

export default class EnemyC extends Enemy {
  patrolDistance: number;
  initialX: number;
  patrolDirection: number;
  image: HTMLImageElement;
  holdCount: number;
  frameHold: number;

  constructor(image: HTMLImageElement, position: IPosition) {
    let dimensions: IDimensions = { width: 30, height: 30 };
    let spritePosition: IPosition = { x: 0, y: 0 }; // Position in spritesheet
    let spriteDimensions: IDimensions = { width: 50, height: 50 }; // Dimensions in spritesheet
    let spriteCount: number = 3;
    let frameX: number = 0;
    let gameFrame: number = 0;
    let descent: boolean = false;
    let isFlipX: boolean = false;
    let hitBox: IDimensions = { width: 38, height: 45 };
    let hp: number = 6;
    let damage: number = 1;
    let patrolDistance: number = 100;
    let dx: number = 0;
    let dy: number = 0;
    let range: number = CANVAS_DIMENSIONS.WIDTH / 2;
    let cooldown: number = 100;
    let cooldownCounter: number = 0;

    super(
      image,
      spritePosition,
      spriteDimensions,
      position,
      dimensions,
      spriteCount,
      frameX,
      gameFrame,
      dx,
      dy,
      descent,
      isFlipX,
      hitBox,
      hp,
      damage,
      range,
      cooldown,
      cooldownCounter,
      false
    );
    this.x = position.x;
    this.y = position.y;
    this.image = image;
    this.patrolDistance = patrolDistance;
    this.initialX = position.x;
    this.patrolDirection = 1;
    this.holdCount = 0;
    this.frameHold = 10;
  }

  shootProjectile(player: IPlayer) {
    const projectile = new EnemyProjectile(
      this.image,
      117,
      167,
      8,
      8,
      this.x,
      this.y,
      -((this.x - player.x) / this.range) * 1.5,
      -3,
      8,
      8,
      2
    );

    this.projectiles.push(projectile);
  }

  update(
    player: IPlayer,
    enemies: EnemyC[],
    dropItems: DropItem[],
    index: number
  ) {
    // Call the parent update method
    super.update(player, enemies, dropItems, index);
    this.gameFrame++;
    if (this.gameFrame >= STAGGER_FRAMES) {
      this.gameFrame = 0;

      if (this.frameX >= enemyCSpritePositions.length - 1) {
        if (this.holdCount < this.frameHold) {
          this.frameX = enemyCSpritePositions.length - 1;
          this.holdCount++;
        } else {
          this.frameX = 0;
          this.holdCount = 0;
        }
      } else {
        this.frameX = (this.frameX + 1) % enemyCSpritePositions.length;
      }
    }

    let framePos = enemyCSpritePositions[this.frameX];
    this.spriteX = framePos.x;
    this.spriteY = framePos.y;
    this.spriteWidth = framePos.width;
    this.spriteHeight = framePos.height;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    if (this.shouldShootProjectile(player)) this.shootProjectile(player);
    this.projectiles.forEach((projectile) => projectile.update());
  }

  draw() {
    // Use the parent draw method to draw the sprite
    super.draw();
    this.projectiles.forEach((projectile) => projectile.draw());
  }
}
