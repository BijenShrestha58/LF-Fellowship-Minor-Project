import { IPosition } from "../../interfaces/IPosition";
import { MAP_OFFSET } from "../constants";

export const enemyBSpawn: IPosition[] = [
  { x: 1218, y: 1357 },
  { x: 1060, y: 1597 },
  { x: 1317, y: 1592 },
  { x: 1823, y: 1857 },
  { x: 2989, y: 1827 },
];

export const adjustedEnemyBSpawn: IPosition[] = enemyBSpawn.map((enemyB) => ({
  x: enemyB.x + MAP_OFFSET.X,
  y: enemyB.y + MAP_OFFSET.Y,
}));

export const enemyBSpritePositions = [
  { x: 216, y: 2, width: 30, height: 37 },
  { x: 7, y: 51, width: 30, height: 37 },
  { x: 43, y: 51, width: 30, height: 37 },
];
