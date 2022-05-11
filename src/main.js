import '../css/style.css';
import {sketch} from 'p5js-wrapper';

import { Background } from './Background.js';
import { Player } from './Player';
import { Stairs } from './Stairs';

import { GAME_WIDTH, GAME_HEIGHT, STEP_NUM } from './Constants';
import { IntroScene } from './Scenes/IntroScene';

let bg, player, stairs, scene;

sketch.setup = function(){
  createCanvas (GAME_WIDTH, GAME_HEIGHT);

  bg = new Background(400, 300, 1200);
  player = new Player(GAME_WIDTH/2, GAME_HEIGHT*0.66, 100);
  player.registerCallback(gameOver);
  stairs = new Stairs(GAME_HEIGHT*0.645);
  stairs.getStairs(STEP_NUM);

  scene = new IntroScene(bg, player, stairs);

  subscribeSubjects();
}

sketch.draw = function(){
  scene.draw();
}

sketch.mousePressed = function(){
  if (scene.getSceneNum() == 1) {
    // IntroScene의 btn이 클릭되었다면
    scene = scene.nextScene();
  }
  if (scene.getSceneNum() == 3) {
    // 재시작 btn이 클릭되었다면
    player = new Player(GAME_WIDTH/2, GAME_HEIGHT*0.66, 100);
    player.registerCallback(gameOver);
    stairs = new Stairs(GAME_HEIGHT*0.645);
    stairs.getStairs(STEP_NUM);
    scene = scene.nextScene(player, stairs);
  }
  scene.mousePressed();
}

sketch.keyPressed = function() {
  scene.keyPressed();
}

function subscribeSubjects() {
  scene.subscribeSubjects();
}

function gameOver() {
  if (scene.getSceneNum() == 2) {
    console.log("Player callback!");
    scene = scene.nextScene();
  }
}