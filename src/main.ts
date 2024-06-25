import DropItem from "./classes/DropItem";
import EnemyA from "./classes/EnemyA";
import EnemyB from "./classes/EnemyB";
import EnemyC from "./classes/EnemyC";
import Hp from "./classes/Hp";
import Player from "./classes/Player";
import StageMap from "./classes/StageMap";
import "./style.css";
import { BG_DIMENSIONS } from "./constants/general";
import { adjustedEnemyASpawn } from "./constants/enemyAData";
import { adjustedEnemyBSpawn, isFlip } from "./constants/enemyBData";
import { adjustedEnemyCSpawn } from "./constants/enemyCData";

//CANVAS SETUP
const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
export const ctx = canvas.getContext("2d")!;

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

//VARIABLES DECLARATION
const XImages = document.getElementById("X") as HTMLImageElement;
const map = document.getElementById("map") as HTMLImageElement;
// const weapons = document.getElementById("weapons") as HTMLImageElement;
const enemyAImg = document.getElementById("enemyA") as HTMLImageElement;
const enemyBImg = document.getElementById("enemyB") as HTMLImageElement;
const enemyCImg = document.getElementById("enemyC") as HTMLImageElement;
export const itemImg = document.getElementById("items") as HTMLImageElement;

let lastTime = 0;
const fpsInterval = 1000 / 60;

let player: Player;
let stageMap: StageMap;
let enemies: (EnemyA | EnemyB | EnemyC)[]; //array of different enemies
let dropItems: DropItem[];
let hpBar: Hp;
enemies = [];
dropItems = [];

function setUp() {
  player = new Player(XImages);
  stageMap = new StageMap(map);
  hpBar = new Hp();
  adjustedEnemyASpawn.forEach((enemy) => {
    let enemyA = new EnemyA(enemyAImg, enemy);
    enemies.push(enemyA);
  });
  adjustedEnemyBSpawn.forEach((enemy, index) => {
    let enemyB = new EnemyB(enemyBImg, enemy, isFlip[index]);
    enemies.push(enemyB);
  });
  adjustedEnemyCSpawn.forEach((enemy) => {
    let enemyC = new EnemyC(enemyCImg, enemy);
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
    ctx.fillStyle = "#606888";
    ctx.clearRect(
      player.cameraBox.offsetX,
      player.cameraBox.offsetY,
      BG_DIMENSIONS.WIDTH,
      BG_DIMENSIONS.HEIGHT
    );
    ctx.fillRect(
      player.cameraBox.offsetX,
      player.cameraBox.offsetY,
      BG_DIMENSIONS.WIDTH,
      BG_DIMENSIONS.HEIGHT
    );
    stageMap.update();
    stageMap.draw();
    enemies.forEach((enemy, index) => {
      enemy.update(player, enemies, dropItems, index);
      enemy.draw();
    });

    player.update(enemies);
    player.draw();

    dropItems.map((dropItem, index) => {
      dropItem.update(player, dropItems, index);
      dropItem.draw();
    });

    hpBar.update(player);
    hpBar.draw();
  }
  requestAnimationFrame(gameLoop);
}

setUp();
requestAnimationFrame(gameLoop);
