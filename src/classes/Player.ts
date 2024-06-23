import { IPlayer } from "../interfaces/IPlayer";
import Sprite from "./Sprite";
import { XSpriteArray } from "../utils/spriteArrays/XSpriteArray";
import {
  CANVAS_DIMENSIONS,
  GRAVITY,
  MAX_DY,
  PLAYER_HIT_BOX,
} from "../utils/constants";
import { adjustedColliders } from "../utils/spriteArrays/mapColliderArray";
import { collision } from "../utils/collision.ts";

export default class Player extends Sprite implements IPlayer {
  hp: number;
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
  constructor(image: HTMLImageElement) {
    super(
      image,
      { x: 323, y: 17 },
      { width: 30, height: 34 },
      { x: 20, y: 10 },
      { width: 30, height: 34 },
      3,
      0,
      0,
      0,
      false,
      false,
      { width: PLAYER_HIT_BOX.WIDTH, height: PLAYER_HIT_BOX.HEIGHT }
    );
    this.image = image;
    this.hp = 10;
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

    this.currentState = "idle"; // Initial state
    this.keys = new Set<string>();

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
    if (e.key === "x" && this.isJumping) {
      this.dy = 0;
    }
    if (e.key === "c") {
      this.dashDistance = 0;
      this.isDashing = false;
    }
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
    }

    if (this.keys.has("ArrowLeft")) {
      if (this.keys.size === 1) {
        this.walk();
      }
      if (!this.isDashing) this.x -= 1; //if dashing, arrow keys don't do anything

      if (this.isDashing && (this.isJumping || this.descent)) {
        this.x -= this.dashSpeed;
      }
      this.isGoingRight = false;
    }
    if (this.keys.has("ArrowRight")) {
      if (this.keys.size === 1) {
        this.walk();
      }
      if (this.keys.has("ArrowLeft")) {
        //Gives priority to right movement if both left and right arrow keys are pressed
        this.x += 1;
      }
      if (!this.isDashing) this.x += 1;
      if (this.isDashing && (this.isJumping || this.descent)) {
        this.x += this.dashSpeed;
      }
      this.isGoingRight = true;
    }
    if (this.keys.has("c")) {
      if (!this.isJumping && !this.descent) {
        if (this.dashDistance <= this.dashLimit) {
          this.isDashing = true;
          if (this.isGoingRight) {
            this.x += this.dashSpeed;
          } else {
            this.x -= this.dashSpeed;
          }
          if (!this.isJumping && !this.descent) {
            this.dash();
          }
        } else {
          this.keys.delete("c");
          this.isDashing = false;
        }
        this.dashDistance += 3;
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

  collisionHandler() {
    adjustedColliders.forEach((collider) => {
      if (
        collision(
          {
            x: this.x,
            y: this.y + this.dy,
            width: this.hitBox.width,
            height: this.hitBox.height,
          },
          collider
        )
      ) {
        this.y = collider.y - this.hitBox.height;
        if (this.isDashing) this.y = collider.y - this.height;
        this.dy = 0;
      }
    });
  }

  update() {
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
    this.dy += GRAVITY;
    this.collisionHandler();

    if (this.dy >= MAX_DY) this.dy = MAX_DY;
    this.y += this.dy;
    this.descent = this.dy > 0; //falling if dy>0, therefore descent set to true
    this.isJumping = this.dy < 0;
    if (this.descent) {
      this.fall();
    }

    this.movement();

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
  }
}
