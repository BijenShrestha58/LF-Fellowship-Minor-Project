import { IPlayer } from "../interfaces/IPlayer";
import Sprite from "./Sprite";
import { XSpriteArray } from "../utils/spriteArrays/XSpriteArray";
import { CANVAS_DIMENSIONS, GRAVITY } from "../utils/constants";

export default class Player extends Sprite implements IPlayer {
  hp: number;
  lives: number;
  dashDistance: number;
  jumpForce: number;
  isWallClimb: boolean;
  isCharging: boolean;
  isShooting: boolean;
  isGoingRight: boolean;
  currentState: string;
  currentFrameCount: number; // Number of frames in the current animation
  keys: Set<string>;
  constructor(image: HTMLImageElement) {
    super(
      image,
      { x: 323, y: 17 },
      { width: 30, height: 34 },
      { x: 20, y: 100 },
      { width: 30, height: 34 },
      3,
      0,
      0,
      0,
      false
    );
    this.image = image;
    this.hp = 10;
    this.lives = 2;
    this.dashDistance = 0;
    this.jumpForce = 0;
    this.isWallClimb = false;
    this.isCharging = false;
    this.isShooting = false;
    this.isGoingRight = false;
    this.currentState = "idle"; // Initial state
    this.keys = new Set<string>();

    const animation = XSpriteArray.find(
      (anim) => anim.name === this.currentState
    );
    this.currentFrameCount = animation?.pos?.length || 0;
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
    this.idle();
  }

  shoot() {
    this.setState("shoot");
  }

  charge() {
    this.setState("charge");
  }

  wallClimb() {
    this.setState("wallClimb");
  }

  jump() {
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

  update() {
    //movement
    if (this.keys.has("ArrowLeft")) {
      if (this.dy === 0) {
        this.walk();
      }

      this.x -= 1;
      this.isGoingRight = false;
    }
    if (this.keys.has("ArrowRight")) {
      if (this.dy === 0) {
        this.walk();
      }
      this.x += 1;
      this.isGoingRight = true;
    }

    //gravity calcs
    this.dy += GRAVITY;
    this.y += this.dy;

    if (this.y >= CANVAS_DIMENSIONS.HEIGHT - 300) {
      this.dy = 0;
    }

    if (this.dy > 0) {
      this.descent = true;
    } else {
      this.descent = false;
    }
    //fall check
    if (this.descent) {
      this.fall();
    }

    const animation = XSpriteArray.find(
      (anim) => anim.name === this.currentState
    );
    if (animation && animation.pos) {
      this.spriteCount = animation.pos.length;
      const framePos = animation.pos[this.spriteSelect % this.spriteCount];
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
