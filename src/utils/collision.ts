import { IPlayer } from "../interfaces/IPlayer";
import { ISolidObject } from "../interfaces/ISolidObject";

/**
 * Checks for a collision between two solid objects.
 *
 * @param {ISolidObject} object1 - The first solid object.
 * @param {ISolidObject} object2 - The second solid object.
 * @returns {boolean} `true` if the objects are colliding, `false` otherwise.
 *
 * This function checks if the bounding boxes of two objects overlap.
 */
export function collisionGeneral(object1: ISolidObject, object2: ISolidObject) {
  return (
    object1.y + object1.height >= object2.y &&
    object1.y <= object2.y + object2.height &&
    object1.x <= object2.x + object2.width &&
    object1.x + object1.width >= object2.x
  );
}

/**
 * Checks for and resolves collisions between a player and a platform.
 *
 * @param {IPlayer} player - The player object.
 * @param {ISolidObject} platform - The platform object.
 * @returns {void}
 *
 * Handles vertical and horizontal collisions, adjusting the player's position and velocity accordingly.
 */
export function collision(player: IPlayer, platform: ISolidObject) {
  // Vertical collision check (Top of Platform)
  if (
    player.y + player.hitBox.height <= platform.y &&
    player.y + player.hitBox.height + player.dy >= platform.y &&
    player.x + player.hitBox.width > platform.x &&
    player.x < platform.x + platform.width
  ) {
    player.y = platform.y - player.hitBox.height;
    player.dy = 0;
  }

  // Horizontal collision check (Left of Platform)
  if (
    player.x + player.hitBox.width <= platform.x &&
    player.x + player.hitBox.width + player.dx >= platform.x &&
    player.y + player.hitBox.height > platform.y &&
    player.y < platform.y + platform.height
  ) {
    player.dx = 0;
    player.x = platform.x - player.hitBox.width;
    if (player.isJumping || player.descent || player.isWallClimb) {
      player.isWallClimb = true;
    }
  }

  // Horizontal collision check (Right of Platform)
  if (
    player.x >= platform.x + platform.width &&
    player.x + player.dx <= platform.x + platform.width &&
    player.y + player.hitBox.height > platform.y &&
    player.y < platform.y + platform.height
  ) {
    player.dx = 0;
    player.x = platform.x + platform.width;
    if (player.isJumping || player.descent || player.isWallClimb) {
      player.isWallClimb = true;
    }
  }

  // Vertical collision check (Bottom of Platform)
  if (
    player.y >= platform.y + platform.height &&
    player.y + player.dy <= platform.y + platform.height &&
    player.x + player.hitBox.width > platform.x &&
    player.x < platform.x + platform.width
  ) {
    player.dy = 0;
    player.y = platform.y + platform.height;
  }
}
