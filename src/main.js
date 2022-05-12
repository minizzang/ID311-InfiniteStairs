import '../css/style.css';
import { sketch } from 'p5js-wrapper';

import { Background } from './Background.js';
import { Player } from './Player.js';
import { Stairs } from './Stairs.js';
import { IntroScene } from './Scenes/IntroScene.js';

import { GAME_WIDTH, GAME_HEIGHT, STEP_NUM } from './Constants.js';

let bg, player, stairs, scene, font;

// SCENE NUM 1: Intro scene, 2: Play scene, 3: GameOver scene

sketch.setup = function(){
  createCanvas (GAME_WIDTH, GAME_HEIGHT);
  initObjects();

  // init first scene as intro scene
  scene = new IntroScene(bg, player, stairs);

  font = loadFont('../assets/PixelMaster.ttf');
}

sketch.draw = function(){
  textFont(font);
  scene.draw();
}

function initObjects() {
  // init background
  bg = new Background(400, 300, 1200);
  
  // init a player and register callback for game over
  player = new Player(GAME_WIDTH/2, GAME_HEIGHT*0.66, 100);
  player.registerCallback(gameOver);

  // init stairs
  stairs = new Stairs(GAME_HEIGHT*0.645);
  stairs.getStairs(STEP_NUM);
}

// callback for game over.
// change the play scene to gameover.
function gameOver() {
  if (scene.getSceneNum() == 2) {
    scene = scene.nextScene();
  }
}

sketch.mousePressed = function(){
  if (scene.getSceneNum() == 1) {
    // when press play btn, change from intro scene to play scene
    scene = scene.nextScene();
  }
  if (scene.getSceneNum() == 3) {
    // when press replay btn, change from gameover scene to play scene
    initObjects();
    scene = scene.nextScene(player, stairs);
  }
  scene.mousePressed();
}

sketch.keyPressed = function() {
  if (scene.getSceneNum() == 2) {
    // for play scene, keyboard input will used
    scene.keyPressed();
  }
}