import { IPosition } from "../../interfaces/IPosition";
import { MAP_OFFSET } from "../constants";

export const enemyASpawn: IPosition[] = [
  { x: 639, y: 1454 },
  { x: 771, y: 1405 },
  { x: 961, y: 1454 },
  { x: 1268, y: 1693 },
  { x: 1447, y: 1661 },
  { x: 1623, y: 1629 },
  { x: 1797, y: 1693 },
  { x: 1893, y: 1693 },
  { x: 3295, y: 1630 },
];

export const adjustedEnemyASpawn: IPosition[] = enemyASpawn.map((enemyA) => ({
  x: enemyA.x + MAP_OFFSET.X,
  y: enemyA.y + MAP_OFFSET.Y,
}));

export const enemyASpritePositions = [
  { x: 34, y: 2, width: 39, height: 49 },
  { x: 76, y: 2, width: 37, height: 49 },
  { x: 117, y: 2, width: 34, height: 49 },
  { x: 161, y: 2, width: 29, height: 49 },
  { x: 197, y: 2, width: 27, height: 49 },
  { x: 24, y: 59, width: 27, height: 49 },
  { x: 59, y: 59, width: 28, height: 49 },
  { x: 103, y: 59, width: 33, height: 49 },
  { x: 149, y: 59, width: 32, height: 49 },
];
