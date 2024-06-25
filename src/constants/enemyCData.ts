import { IPosition } from "../interfaces/IPosition";
import { MAP_OFFSET } from "./general";

export const enemyCSpawn: IPosition[] = [
  { x: 2249, y: 1940 },
  { x: 2731, y: 1927 },
  { x: 2989, y: 1940 },
  { x: 3240, y: 1940 },
  { x: 3889, y: 915 },
  { x: 4026, y: 915 },
];

export const adjustedEnemyCSpawn: IPosition[] = enemyCSpawn.map((enemyC) => ({
  x: enemyC.x + MAP_OFFSET.X,
  y: enemyC.y + MAP_OFFSET.Y,
}));

export const enemyCSpritePositions = [{ x: 88, y: 3, width: 38, height: 45 }];
