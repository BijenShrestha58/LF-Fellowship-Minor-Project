export const GRAVITY = 0.1;

export const STAGGER_FRAMES = 5;

export const MAX_DY = 5;

export const SCALING_FACTOR = 1 / 258.6666666666667;

export const PLAYER_HIT_BOX = {
  WIDTH: 30,
  HEIGHT: 34,
};

export const BG_DIMENSIONS = {
  WIDTH: 4894,
  HEIGHT: 2172,
};

export const MAP_OFFSET = {
  X: -1536 / 3,
  Y: -BG_DIMENSIONS.HEIGHT + (776 / 3) * 3.5 - 30,
};

export const ASPECT_RATIO = 720 / 776;

export const CANVAS_DIMENSIONS = {
  WIDTH: window.innerHeight * ASPECT_RATIO / (window.innerHeight * SCALING_FACTOR),
  HEIGHT: window.innerHeight / (window.innerHeight * SCALING_FACTOR),
};

export enum GAME_STATE {
  START = "START",
  PLAYING = "PLAYING",
  GAME_OVER = "GAME_OVER",
}
