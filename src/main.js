import '../css/style.css';
// import { sketch } from 'p5js-wrapper';
// import 'p5/lib/addons/p5.sound';
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


let bg, player, stairs, scene, font, bgm, gameOverSound, ani;

// SCENE NUM 1: Intro scene, 2: Play scene, 3: GameOver scene
function preload() {
  // bgm = new Audio('../public/bgm.mp3');
  // bgm.loop = true;

  // gameOverSound = new Audio('../public/gameOver.MP3');

  bgm = loadSound('../assets/Sounds/bgm.wav');
  bgm.setVolume(0.1);

  gameOverSound = loadSound('../assets/Sounds/gameOver.wav');
  gameOverSound.setVolume(0.2);

  // ani = loadAnimation('../assets/Images/worker/workerRight1.png', '../assets/Images/worker/workerRight3.png');
}

function setup(){
  font = loadFont('../assets/PixelMaster.ttf');

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
    bgm.pause();

    await delay(200);
    gameOverSound.play();
  }
}

function delay(ms) {
  return new Promise((resolve)=>setTimeout(resolve, ms))
}

async function mousePressed(){
  if (scene.getSceneNum() == 1) {
    // when press play btn, change from intro scene to play scene
    if (scene.checkBtnPressed('play')) {
      bgm.loop();
      // bgm.play();
      scene = scene.nextScene();
    }
  }
  if (scene.getSceneNum() == 3) {
    // when press replay btn, change from gameover scene to play scene
    if (scene.checkBtnPressed('play')) {
      initObjects();
      if (gameOverSound.isPlaying()) {
        gameOverSound.pause();
      }
      await delay(200);
      // bgm.load();
      bgm.play();
      scene = scene.nextScene(bg, player, stairs);
    }
  }
}

function keyPressed() {
  if (scene.getSceneNum() == 2) {
    // for play scene, keyboard input will used
    scene.keyPressed();
  }
}

window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.keyPressed = keyPressed;