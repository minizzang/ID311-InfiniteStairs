import '../css/style.css';
import { sketch } from 'p5js-wrapper';
import 'p5/lib/addons/p5.sound';

import { Background } from './Background.js';
import { Player } from './Player.js';
import { Stairs } from './Stairs.js';
import { IntroScene } from './Scenes/IntroScene.js';

import { GAME_WIDTH, GAME_HEIGHT, STEP_NUM } from './Constants.js';

let bg, player, stairs, scene, font, bgm, gameOverSound;

// SCENE NUM 1: Intro scene, 2: Play scene, 3: GameOver scene
function preload() {
  bgm = loadSound('../assets/Sounds/bgm.mp3');
  bgm.setVolume(0.1);

  gameOverSound = loadSound('../assets/Sounds/gameOver.mp3');
  gameOverSound.setVolume(0.5);
}

sketch.setup = function(){
  font = loadFont('../assets/PixelMaster.ttf');

  createCanvas (GAME_WIDTH, GAME_HEIGHT);
  initObjects();

  // init first scene as intro scene
  scene = new IntroScene(bg, player, stairs);
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
async function gameOver() {
  if (scene.getSceneNum() == 2) {
    await delay(1500);    // wait for player falling animation
    scene = scene.nextScene();
    bgm.stop();

    await delay(200);
    gameOverSound.play();
  }
}

function delay(ms) {
  return new Promise((resolve)=>setTimeout(resolve, ms))
}

sketch.mousePressed = async function(){
  if (scene.getSceneNum() == 1) {
    // when press play btn, change from intro scene to play scene
    if (scene.checkBtnPressed('play')) {
      bgm.loop();
      scene = scene.nextScene();
    }
  }
  if (scene.getSceneNum() == 3) {
    // when press replay btn, change from gameover scene to play scene
    if (scene.checkBtnPressed('play')) {
      initObjects();
      if (gameOverSound.isPlaying()) {
        gameOverSound.stop();
      }
      await delay(200);
      bgm.play();
      scene = scene.nextScene(bg, player, stairs);
    }
  }
}

sketch.keyPressed = function() {
  if (scene.getSceneNum() == 2) {
    // for play scene, keyboard input will used
    scene.keyPressed();
  }
}

window.preload = preload;