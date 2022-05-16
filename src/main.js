import '../css/style.css';
import WavPlayer from 'webaudio-wav-stream-player';

import { Background } from './Background.js';
import { Player } from './Player.js';
import { Stairs } from './Stairs.js';
import { IntroScene } from './Scenes/IntroScene.js';

import { GAME_WIDTH, GAME_HEIGHT, STEP_NUM } from './Constants.js';

// Import for firebase
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let bg, player, stairs, scene, font, bgm, gameOverSound, goUpAnimation;

// SCENE NUM 1: Intro scene, 2: Play scene, 3: GameOver scene
function preload() {
  bgm = loadSound('../assets/Sounds/bgm.wav');
  bgm.setVolume(0.1);

  gameOverSound = loadSound('../assets/Sounds/gameOver.wav');
  gameOverSound.setVolume(0.2);
}

function setup(){
  font = loadFont('../assets/PixelIntv.otf');

  createCanvas (GAME_WIDTH, GAME_HEIGHT);
  initObjects();

  // init first scene as intro scene
  scene = new IntroScene(bg, player, stairs);
}

function draw(){
  textFont(font);
  scene.draw();
  // animation(ani, 300, 150);
}

function initObjects() {
  // init background
  bg = new Background(GAME_WIDTH/2, -550, GAME_WIDTH);
  
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
    scene.setBestScore();
    bgm.stop();

    await delay(200);
    gameOverSound.play();
  }
}

function delay(ms) {
  return new Promise((resolve)=>setTimeout(resolve, ms))
}

function mousePressed(){
  // 1: when press play btn, change from intro scene to play scene
  // 3: when press replay btn, change from gameover scene to play scene
  if (scene.getSceneNum() == 1 || scene.getSceneNum() == 3) {
    if (scene.checkBtnPressed('play')) {
      playGame(scene.getSceneNum());
    }
  }
}

function keyPressed() {
  // play button works on space bar also
  if (key == " " && (scene.getSceneNum() == 1 || scene.getSceneNum() == 3)) {
    playGame(scene.getSceneNum());
  }
  // for play scene, keyboard input will used
  if (scene.getSceneNum() == 2) {
    scene.keyPressed();
  }
}

async function playGame(sceneNum) {
  if (sceneNum == 1) {
    bgm.loop();
    scene = scene.nextScene();
  } else if (sceneNum == 3) {
    initObjects();
    if (gameOverSound.isPlaying()) {
      gameOverSound.stop();
    }
    await delay(200);
    bgm.play();
    scene = scene.nextScene(bg, player, stairs);
  }
}

window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.keyPressed = keyPressed;