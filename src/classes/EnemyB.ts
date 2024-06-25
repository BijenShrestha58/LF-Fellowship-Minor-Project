import { IDimensions } from "../interfaces/IDimensions";
import { IPlayer } from "../interfaces/IPlayer";
import { IPosition } from "../interfaces/IPosition";
import { CANVAS_DIMENSIONS, STAGGER_FRAMES } from "../utils/constants";
import Enemy from "./Enemy";
import { enemyBSpritePositions } from "../utils/spriteArrays/enemyBData";
import EnemyProjectile from "./EnemyProjectile";

export default class EnemyB extends Enemy {
  patrolDistance: number;
  initialX: number;
  patrolDirection: number;
  image: HTMLImageElement;
  holdCount: number;
  frameHold: number;

  constructor(image: HTMLImageElement, position: IPosition, isFlip: boolean) {
    let dimensions: IDimensions = { width: 30, height: 30 };
    let spritePosition: IPosition = { x: 0, y: 0 }; // Position in spritesheet
    let spriteDimensions: IDimensions = { width: 50, height: 50 }; // Dimensions in spritesheet
    let spriteCount: number = 3;
    let frameX: number = 0;
    let gameFrame: number = 0;
    let descent: boolean = false;
    let isFlipX: boolean = true;
    let hitBox: IDimensions = { width: 30, height: 37 };
    let hp: number = 1.5;
    let damage: number = 1;
    let patrolDistance: number = 100;
    let dx: number = 0;
    let dy: number = 1;
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
      true
    );
    this.x = position.x;
    this.y = position.y;
    this.image = image;
    this.patrolDistance = patrolDistance;
    this.initialX = position.x;
    this.patrolDirection = 1;
    this.holdCount = 0;
    this.frameHold = 10;
    this.isFlipX = isFlip;
  }

  shootProjectile(player: IPlayer) {
    const projectile = new EnemyProjectile(
      this.image,
      193,
      86,
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

  update(player: IPlayer, enemies: EnemyB[], index: number) {
    // // Call the parent update method
    let tempY = this.y;
    super.update(player, enemies, index);
    this.dy = 0;
    this.y = tempY;

    this.gameFrame++;
    if (this.gameFrame >= STAGGER_FRAMES) {
      this.gameFrame = 0;

      if (this.frameX >= enemyBSpritePositions.length - 1) {
        if (this.holdCount < this.frameHold) {
          this.frameX = enemyBSpritePositions.length - 1;
          this.holdCount++;
        } else {
          this.frameX = 0;
          this.holdCount = 0;
        }
      } else {
        this.frameX = (this.frameX + 1) % enemyBSpritePositions.length;
      }
    }

    let framePos = enemyBSpritePositions[this.frameX];
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