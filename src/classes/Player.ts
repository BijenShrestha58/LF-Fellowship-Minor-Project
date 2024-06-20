import { IPlayer } from "../interfaces/IPlayer";
import Sprite from "./Sprite";
import { XSpriteArray } from "../utils/spriteArrays/XSpriteArray";
import { GRAVITY } from "../utils/constants";

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
      false
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
    }
  }

  shoot() {
    this.setState("shoot");
  }

  charge() {
    this.setState("charge");
  }

  dash() {
    this.setState("dash");
  }
  wallClimb() {
    this.setState("wallClimb");
  }

  jump() {
    this.dy -= this.jumpForce;
    this.setState("jump");
  }
  fall() {
    this.setState("fall");
  }
  walk() {
    this.setState("walk");
  }

  idle() {
    this.setState("idle");
  }

  movement() {
    if (this.keys.has("ArrowLeft")) {
      if (this.keys.size === 1) {
        this.walk();
      }
      this.x -= 1;
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
      this.x += 1;
      this.isGoingRight = true;
    }
    if (this.keys.has("c")) {
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
      }
      this.dashDistance += 3;
    }
    if (this.keys.has("x")) {
      if (!this.descent && !this.isJumping) {
        this.jump();
      }
    }
  }

  update() {
    //idle if no inputs being given
    if (this.keys.size === 0) {
      this.idle();
    }

    //gravity calcs
    this.dy += GRAVITY;
    if (this.y + this.dy >= 120) {
      this.y = 120;
      this.dy = 0;
    }
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
        var framePos = animation.pos[this.spriteSelect];
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
