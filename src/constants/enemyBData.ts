import { IPosition } from "../interfaces/IPosition";
import { MAP_OFFSET } from "./general";

export const enemyBSpawn: IPosition[] = [
  { x: 1226, y: 1357 },
  { x: 1060, y: 1597 },
  { x: 1317, y: 1592 },
  { x: 1829, y: 1857 },
  { x: 2999, y: 1827 },
];

export const isFlip: boolean[] = [true, false, false, false, true];

export const adjustedEnemyBSpawn: IPosition[] = enemyBSpawn.map((enemyB) => ({
  x: enemyB.x + MAP_OFFSET.X,
  y: enemyB.y + MAP_OFFSET.Y,
}));

export const enemyBSpritePositions = [
  { x: 216, y: 2, width: 30, height: 37 },
  { x: 7, y: 51, width: 30, height: 37 },
  { x: 43, y: 51, width: 30, height: 37 },
];
