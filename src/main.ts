import DropItem from "./classes/DropItem";
import EnemyA from "./classes/EnemyA";
import EnemyB from "./classes/EnemyB";
import EnemyC from "./classes/EnemyC";
import Hp from "./classes/Hp";
import Player from "./classes/Player";
import StageMap from "./classes/StageMap";
import "./style.css";
import {
  ASPECT_RATIO,
  BG_DIMENSIONS,
  GAME_STATE,
  SCALING_FACTOR,
} from "./constants/general";
import { adjustedEnemyASpawn } from "./constants/enemyAData";
import { adjustedEnemyBSpawn, isFlip } from "./constants/enemyBData";
import { adjustedEnemyCSpawn } from "./constants/enemyCData";

//CANVAS SETUP
const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
export const ctx = canvas.getContext("2d")!;

ctx.canvas.height = window.innerHeight;
ctx.canvas.width = window.innerHeight * ASPECT_RATIO;

//VARIABLES DECLARATION
const XImages = document.getElementById("X") as HTMLImageElement;
const map = document.getElementById("map") as HTMLImageElement;
export const weapons = document.getElementById("weapons") as HTMLImageElement;
const enemyAImg = document.getElementById("enemyA") as HTMLImageElement;
const enemyBImg = document.getElementById("enemyB") as HTMLImageElement;
const enemyCImg = document.getElementById("enemyC") as HTMLImageElement;
export const itemImg = document.getElementById("items") as HTMLImageElement;
let gameState = GAME_STATE.START;

let lastTime = 0;
const fpsInterval = 1000 / 60;

let player: Player;
let stageMap: StageMap;
let enemies: (EnemyA | EnemyB | EnemyC)[]; //array of different enemies
let dropItems: DropItem[];
let hpBar: Hp;

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "Enter":
      if (
        gameState === GAME_STATE.START ||
        gameState === GAME_STATE.GAME_OVER
      ) {
        gameState = GAME_STATE.PLAYING;
        setUp();
      }
  }
});

function setUp() {
  player = new Player(XImages);
  stageMap = new StageMap(map);
  hpBar = new Hp();
  enemies = [];
  dropItems = [];
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
  ctx.scale(canvas.height * SCALING_FACTOR, canvas.height * SCALING_FACTOR);
  requestAnimationFrame(gameLoop);
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
      canvas.width,
      canvas.height
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
    if (player.hp <= 0) {
      gameState = GAME_STATE.GAME_OVER;
      showGameOverScreen();
      return;
    }
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

showMenu();
function showMenu() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(
    "Press Enter to Start",
    canvas.width / 2,
    canvas.height / 2 - 40
  );
}

function showGameOverScreen() {
  ctx.reset();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 40);
  ctx.fillText(
    "Press Enter to Restart",
    canvas.width / 2,
    canvas.height / 2 + 40
  );
}
