import { IDimensions } from "../interfaces/IDimensions";
import { IPosition } from "../interfaces/IPosition";
import { IPlayer } from "../interfaces/IPlayer";
import { collisionGeneral } from "../utils/collision";
import { ctx, itemImg } from "../main";

export default class DropItem {
  x: number;
  y: number;
  width: number;
  height: number;
  healthBoost: number;
  image: HTMLImageElement;

  constructor(
    position: IPosition,
    dimensions: IDimensions,
    healthBoost: number
  ) {
    this.x = position.x;
    this.y = position.y;
    this.width = dimensions.width;
    this.height = dimensions.height;
    this.healthBoost = healthBoost;
    this.image = itemImg;
  }

  update(player: IPlayer, dropItems: DropItem[], index: number) {
    // Check for collision with the player
    if (collisionGeneral(this, player)) {
      player.hp += this.healthBoost;
      if (player.hp > player.maxHp) player.hp = player.maxHp;
      dropItems.splice(index, 1);
    }
  }

  draw() {
    ctx.drawImage(
      this.image,
      38,
      39,
      16,
      12,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
