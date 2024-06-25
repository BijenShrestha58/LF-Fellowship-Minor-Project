import { IDimensions } from "../interfaces/IDimensions";
import { IPlayer } from "../interfaces/IPlayer";
import { IPosition } from "../interfaces/IPosition";
import { ctx } from "../main";
import { collisionGeneral } from "../utils/collision";
import { STAGGER_FRAMES } from "../utils/constants";
import Enemy from "./Enemy";
import { enemyASpritePositions } from "../utils/spriteArrays/enemyAData";

export default class EnemyA extends Enemy {
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
    let hitBox: IDimensions = { width: 27, height: 32 };
    let hp: number = 3;
    let damage: number = 1;
    let patrolDistance: number = 100;
    let dx: number = 0;
    let dy: number = 0;

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
      damage
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

  update(player: IPlayer, enemies: EnemyA[], index: number) {
    // Patrol behavior
    this.x += this.dx * this.patrolDirection;

    // Change direction when reaching patrol limits
    if (
      this.x > this.initialX + this.patrolDistance ||
      this.x < this.initialX
    ) {
      this.patrolDirection *= -1;
      this.isFlipX = !this.isFlipX; // Flip the sprite when changing direction
    }

    // Add gravity or other vertical movement logic if necessary
    this.y += this.dy;

    // Call the parent update method for any additional logic
    super.update(player, enemies, index);
    this.gameFrame++;
    if (this.gameFrame >= STAGGER_FRAMES) {
      this.gameFrame = 0;

      if (this.frameX >= enemyASpritePositions.length - 1) {
        if (this.holdCount < this.frameHold) {
          this.frameX = enemyASpritePositions.length - 1;
          this.holdCount++;
        } else {
          this.frameX = 0;
          this.holdCount = 0;
        }
      } else {
        this.frameX = (this.frameX + 1) % enemyASpritePositions.length;
      }
    }

    let framePos = enemyASpritePositions[this.frameX];
    this.spriteX = framePos.x;
    this.spriteY = framePos.y;
    this.spriteWidth = framePos.width;
    this.spriteHeight = framePos.height;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
  }

  draw() {
    // Use the parent draw method to draw the sprite
    super.draw();
  }
}
