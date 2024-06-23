import Player from "./classes/Player";
import StageMap from "./classes/StageMap";
import "./style.css";

//CANVAS SETUP
const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
export const ctx = canvas.getContext("2d")!;

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

//VARIABLES DECLARATION
const XImages = document.getElementById("X") as HTMLImageElement;
const map = document.getElementById("map") as HTMLImageElement;
let lastTime = 0;
const fpsInterval = 1000 / 60;

let player: Player;
let stageMap: StageMap;

function setUp() {
  player = new Player(XImages);
  stageMap = new StageMap(map);
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
    player.update();
    stageMap.draw();
    player.draw();
  }
  requestAnimationFrame(gameLoop);
}

setUp();
requestAnimationFrame(gameLoop);
