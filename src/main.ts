import Enemy from "./classes/Enemy";
import EnemyA from "./classes/EnemyA";
import Hp from "./classes/Hp";
import Player from "./classes/Player";
import StageMap from "./classes/StageMap";
import "./style.css";
import { adjustedEnemyASpawn } from "./utils/spriteArrays/enemyAData";

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

let lastTime = 0;
const fpsInterval = 1000 / 60;

let player: Player;
let stageMap: StageMap;
let enemies: EnemyA[]; //use union here (EnemyA|EnemyB)[]
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
  console.log(enemies);

  ctx.scale(3, 3);
}

function gameLoop(timestamp: number) {
  const elapsed = timestamp - lastTime;

  if (elapsed > fpsInterval) {
    // Update lastTime to the current timestamp
    lastTime = timestamp - (elapsed % fpsInterval);

    // Game logic and drawing code
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
