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

let player: Player;
let stageMap: StageMap;

function setUp() {
  player = new Player(XImages);
  stageMap = new StageMap(map);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  // stageMap.update();
  stageMap.draw();
  player.draw();
  requestAnimationFrame(gameLoop);
}

setUp();
gameLoop();
