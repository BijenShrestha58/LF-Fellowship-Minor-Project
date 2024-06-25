import { IPlayer } from "../interfaces/IPlayer";
import Sprite from "./Sprite";
import { XSpriteArray } from "../utils/spriteArrays/XSpriteArray";
import { GRAVITY, MAX_DY, PLAYER_HIT_BOX } from "../utils/constants";
import { adjustedColliders } from "../utils/spriteArrays/mapColliderArray";
import { collision, collisionGeneral } from "../utils/collision.ts";
import CameraBox from "./CameraBox.ts";
import Projectile from "./Projectile.ts";
import EnemyA from "./EnemyA.ts";
import { ctx } from "../main.ts";
import EnemyProjectile from "./EnemyProjectile.ts";

export default class Player extends Sprite implements IPlayer {
  lives: number;
  dashDistance: number;
  jumpForce: number;
  isWallClimb: boolean;
  isCharging: boolean;
  isShooting: boolean;
  isJumping: boolean;
  isGoingRight: boolean;
  dashSpeed: number;
  currentState: string;
  dashLimit: number;
  shootInterval: number;
  maxShootInterval: number;
  keys: Set<string>;
  isDashing: boolean;
  cameraBox: CameraBox;
  projectiles: Projectile[];
  chargeTime: number;
  immortalityFrames: number;
  immortalityFrameCount: number;
  recoil: number;
  maxHp: number;

  constructor(image: HTMLImageElement) {
    let maxHpValue = 10;
    super(
      image,
      { x: 323, y: 17 }, //position in spritesheet
      { width: 30, height: 34 }, //dimensions in spritesheet
      { x: 20, y: 10 }, //position
      { width: 30, height: 34 }, //dimensions
      3, //spriteCount
      0, //frameX
      0, //gameFrame
      0, //dx
      0, //dy
      false, //descent
      false, //isFlipX
      { width: PLAYER_HIT_BOX.WIDTH, height: PLAYER_HIT_BOX.HEIGHT }, //hitbox
      maxHpValue //hp
    );
    this.image = image;

    this.lives = 2;

    this.dashSpeed = 3;
    this.dashDistance = 0;
    this.dashLimit = 100;
    this.isDashing = false;

    this.jumpForce = 3;
    this.isWallClimb = false;
    this.isCharging = false;
    this.isShooting = false;
    this.isJumping = false;
    this.isGoingRight = true;
    this.shootInterval = 0;
    this.maxShootInterval = 10;
    this.cameraBox = new CameraBox();
    this.currentState = "idle"; // Initial state
    this.keys = new Set<string>();
    this.projectiles = [];
    this.immortalityFrameCount = 100;
    this.immortalityFrames = 100;
    this.chargeTime = 0;
    this.recoil = 20;
    this.maxHp = maxHpValue;

    document.addEventListener("keydown", (e) => this.keyDown(e));
    document.addEventListener("keyup", (e) => this.keyUp(e));
  }

  // Method to change state
  setState(newState: string) {
    if (this.currentState !== newState) {
      //prevents re-animation
      this.currentState = newState;
      const animation = XSpriteArray.find(
        (anim) => anim.name === this.currentState
      );
      if (animation) {
        this.spriteCount = animation.pos?.length || 0;
        this.gameFrame = 0; // Reset the game frame to start the new animation from the beginning
      }
    }
  }

  keyDown(e: KeyboardEvent) {
    this.keys.add(e.key);
  }

  keyUp(e: KeyboardEvent) {
    this.keys.delete(e.key);
    if (e.key === "z") {
      this.shootProjectile();
      this.chargeTime = 0; // Reset hold time
    }
    if (e.key === "x" && this.isJumping) {
      this.dy = 0;
    }
    if (e.key === "c") {
      this.dashDistance = 0;
      this.isDashing = false;
    }
  }

  shootProjectile() {
    const projectileSpeed = 5;
    const dx = this.isGoingRight ? projectileSpeed : -projectileSpeed;
    const dy = 0;
    let size = "small";

    if (this.chargeTime > 50) {
      size = "large";
    } else if (this.chargeTime > 20) {
      size = "medium";
    }

    const projectile = new Projectile(
      this.isGoingRight ? this.x + this.hitBox.width : this.x,
      this.y + this.hitBox.height / 2,
      dx,
      dy,
      size
    );
    this.projectiles.push(projectile);
  }

  shoot() {
    this.setState("shoot");
  }
  jumpShoot() {
    this.setState("jumpShoot");
  }
  dashShoot() {
    this.setState("dashShoot");
  }
  walkShoot() {
    this.setState("walkShoot");
  }

  charge() {
    this.setState("charge");
  }

  dash() {
    if (!this.isShooting) this.setState("dash");
  }
  wallClimb() {
    this.setState("wallClimb");
  }

  jump() {
    this.dy -= this.jumpForce;
    if (this.isWallClimb) {
      this.dx -= this.isGoingRight ? 10 : -10;
    }
    if (!this.isShooting) this.setState("jump");
  }
  fall() {
    if (!this.isShooting) this.setState("fall");
  }
  walk() {
    if (!this.isShooting) this.setState("walk");
  }

  idle() {
    this.setState("idle");
  }

  movement() {
    if (this.keys.has("z")) {
      this.isShooting = true;
      this.shootInterval = 0;
      this.chargeTime += 1;
    }

    if (this.keys.has("ArrowLeft")) {
      if (this.keys.size === 1) {
        this.walk();
      }
      if (!this.isDashing) this.dx -= 1; //if dashing, arrow keys don't do anything

      if (this.isDashing && (this.isJumping || this.descent)) {
        this.dx -= this.dashSpeed;
      }
      this.isGoingRight = false;
    }
    if (this.keys.has("ArrowRight")) {
      if (this.keys.size === 1) {
        this.walk();
      }
      if (this.keys.has("ArrowLeft")) {
        //Gives priority to right movement if both left and right arrow keys are pressed
        this.dx += 1;
      }
      if (!this.isDashing) this.dx += 1;
      if (this.isDashing && (this.isJumping || this.descent)) {
        this.dx += this.dashSpeed;
      }
      this.isGoingRight = true;
    }
    if (this.keys.has("c")) {
      if (!this.isJumping && !this.descent) {
        if (this.dashDistance <= this.dashLimit) {
          this.isDashing = true;
          if (this.isGoingRight) {
            this.dx += this.dashSpeed;
          } else {
            this.dx -= this.dashSpeed;
          }
          if (!this.isJumping && !this.descent) {
            this.dash();
          }
        } else {
          this.keys.delete("c");
          this.isDashing = false;
        }
        this.dashDistance += this.dashSpeed;
      }
    }

    if (this.keys.has("x")) {
      if (!this.descent && !this.isJumping) {
        this.jump();
      }
    }

    if (this.isShooting) {
      if (this.isJumping || this.descent) {
        this.jumpShoot();
      } else if (this.isDashing) {
        this.dashShoot();
      } else if (this.keys.has("ArrowRight") || this.keys.has("ArrowLeft")) {
        this.walkShoot();
      } else {
        this.shoot();
      }
    }
  }

  updateProjectiles() {
    this.projectiles.forEach((projectile, index) => {
      projectile.update();
      // Remove projectile if it goes off screen
      if (
        projectile.x > this.cameraBox.x + this.cameraBox.width * 1.5 ||
        projectile.x < this.cameraBox.x - this.cameraBox.width * 1.5
      ) {
        this.projectiles.splice(index, 1);
      }
    });
  }

  drawProjectiles() {
    this.projectiles.forEach((projectile) => {
      projectile.draw();
    });
  }

  enemyCollisionDetection(enemies: EnemyA[] | EnemyProjectile[]) {
    enemies.forEach((enemy) => {
      if (collisionGeneral(enemy, this)) {
        if (this.immortalityFrameCount >= this.immortalityFrames) {
          this.hp -= enemy.damage;
          this.immortalityFrameCount = 0;
          this.dx -= this.isGoingRight ? this.recoil : -this.recoil;
        }
      }
    });
  }

  update(enemies: EnemyA[]) {
    //idle if no inputs being given
    if (this.keys.size === 0) {
      this.idle();
    }

    //shooting sprite persistence calcs
    this.shootInterval += 1;
    if (this.shootInterval >= this.maxShootInterval) {
      this.isShooting = false;
    }

    //gravity calcs
    console.log(this.isWallClimb);
    if (this.isWallClimb) {
      this.dy += GRAVITY / 2;
    } else {
      this.dy += GRAVITY;
    }
    this.dx = 0; //reset dx every iteration

    this.movement();

    this.isWallClimb = false;
    this.enemyCollisionDetection(enemies);
    enemies.forEach((enemy) => this.enemyCollisionDetection(enemy.projectiles));

    adjustedColliders.forEach((collider) => {
      collision(this, collider);
    });
    if (this.dy >= MAX_DY) this.dy = MAX_DY;

    this.y += this.dy;

    this.descent = this.dy > 0 && !this.isWallClimb; //falling if dy>0, therefore descent set to true
    this.isJumping = this.dy < 0;
    if (this.descent) {
      this.fall();
    }

    this.x += this.dx;

    //determine direction to face
    this.isFlipX = !this.isGoingRight;

    const animation = XSpriteArray.find(
      (anim) => anim.name === this.currentState
    );
    if (animation && animation.pos) {
      this.spriteCount = animation.pos.length;

      if (animation.loop) {
        var framePos = animation.pos[this.spriteSelect % this.spriteCount];
      } else {
        if (this.spriteSelect < animation.pos.length) {
          var framePos = animation.pos[this.spriteSelect];
        } else {
          var framePos = animation.pos[animation.pos.length - 1];
        }
      }

      if (framePos) {
        this.spriteX = framePos.x;
        this.spriteY = framePos.y;
        this.spriteWidth = framePos.width;
        this.spriteHeight = framePos.height;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
      }
      this.gameFrame++;
    }

    this.cameraBox.update(this);

    this.updateProjectiles();
    this.immortalityFrameCount++;
  }

  draw() {
    if (
      this.immortalityFrames > this.immortalityFrameCount &&
      this.immortalityFrameCount % 2 === 0
    ) {
      ctx.save();
      ctx.filter = "brightness(0) invert(1)";
      super.draw();
      ctx.restore();
    } else {
      super.draw();
    }

    this.drawProjectiles(); // Draw projectiles
  }
}
