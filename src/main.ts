import Enemy from "./classes/Enemy";
import EnemyA from "./classes/EnemyA";
import EnemyB from "./classes/EnemyB";
import EnemyC from "./classes/EnemyC";
import Hp from "./classes/Hp";
import Player from "./classes/Player";
import StageMap from "./classes/StageMap";
import "./style.css";
import { BG_DIMENSIONS } from "./utils/constants";
import { adjustedEnemyASpawn } from "./utils/spriteArrays/enemyAData";
import { adjustedEnemyBSpawn } from "./utils/spriteArrays/enemyBData";
import { adjustedEnemyCSpawn } from "./utils/spriteArrays/enemyCData";

//CANVAS SETUP
const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
export const ctx = canvas.getContext("2d")!;

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

//VARIABLES DECLARATION
const XImages = document.getElementById("X") as HTMLImageElement;
const map = document.getElementById("map") as HTMLImageElement;
const weapons = document.getElementById("weapons") as HTMLImageElement;
const enemyAimg = document.getElementById("enemyA") as HTMLImageElement;
const enemyBimg = document.getElementById("enemyB") as HTMLImageElement;
const enemyCimg = document.getElementById("enemyC") as HTMLImageElement;

let lastTime = 0;
const fpsInterval = 1000 / 60;

let player: Player;
let stageMap: StageMap;
let enemies: (EnemyA | EnemyB | EnemyC)[]; //array of different enemies
let hpBar: Hp;
enemies = [];

function setUp() {
  player = new Player(XImages);
  stageMap = new StageMap(map);
  hpBar = new Hp();
  adjustedEnemyASpawn.forEach((enemy) => {
    let enemyA = new EnemyA(enemyAimg, enemy);
    enemies.push(enemyA);
  });
  adjustedEnemyBSpawn.forEach((enemy) => {
    let enemyB = new EnemyB(enemyBimg, enemy);
    enemies.push(enemyB);
  });
  adjustedEnemyCSpawn.forEach((enemy) => {
    let enemyC = new EnemyC(enemyCimg, enemy);
    enemies.push(enemyC);
  });

  ctx.scale(3, 3);
}

function gameLoop(timestamp: number) {
  const elapsed = timestamp - lastTime;

  if (elapsed > fpsInterval) {
    // Update lastTime to the current timestamp
    lastTime = timestamp - (elapsed % fpsInterval);

    // Game logic and drawing code
    ctx.clearRect(0, 0, BG_DIMENSIONS.WIDTH, BG_DIMENSIONS.HEIGHT);
    ctx.fillRect(0, 0, BG_DIMENSIONS.WIDTH, BG_DIMENSIONS.HEIGHT);
    stageMap.update();
    stageMap.draw();
    enemies.forEach((enemy, index) => {
      enemy.update(player, enemies, index);
      enemy.draw();
    });

    player.update(enemies);
    player.draw();

    hpBar.update(player);
    hpBar.draw();
  }
  requestAnimationFrame(gameLoop);
}

setUp();
requestAnimationFrame(gameLoop);
