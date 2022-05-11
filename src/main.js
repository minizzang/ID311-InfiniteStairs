import '../css/style.css';
import {sketch} from 'p5js-wrapper';

import { Background } from './Background.js';
import { ScoreDisplay } from './ScoreDisplay.js'
import { Player } from './Player';
import { ButtonDisplay } from './Button';
import { Stairs } from './Stairs';

import { GAME_WIDTH, GAME_HEIGHT, STEP_NUM } from './Constants';
import { IntroScene } from './Scenes/IntroScene';
import { PlayScene } from './Scenes/PlayScene';
import { GameOverScene } from './Scenes/GameOverScene';

let bg, score, player, buttons, stairs, scene;
let SCENE = 1;    // introScene: 1, playScene: 2, gameOverScene: 3

sketch.setup = function(){
  createCanvas (GAME_WIDTH, GAME_HEIGHT);

  bg = new Background(400, 300, 1200);
  score = new ScoreDisplay();
  player = new Player(GAME_WIDTH/2, GAME_HEIGHT*0.66, 100);
  player.registerCallback(gameOver);
  buttons = new ButtonDisplay(GAME_WIDTH, GAME_HEIGHT*0.9, 110);
  stairs = new Stairs(GAME_HEIGHT*0.645);
  stairs.getStairs(STEP_NUM);

  scene = new IntroScene(bg, player, stairs);

  subscribeSubjects();
}

sketch.draw = function(){
  scene.draw();
  // bg.draw();
  // stairs.draw();
  // buttons.draw();
  // score.draw();
  // player.draw();
}

sketch.mousePressed = function(){
  // SCENE = 2;  // start the game
  scene = new PlayScene(bg, player, stairs, buttons);
}

sketch.keyPressed = function() {
  switch (key) {
    case 'ArrowLeft':
      // player change direction
      if (SCENE == 2) {
        player.changeDirection();
        buttons.isClicked(1);
      }
      break;
    case 'ArrowRight':
      // player go upstair
      if (SCENE == 2) {
        player.goUpStairs();
        buttons.isClicked(2);
      }
      break;
    case ' ':
      score.setIsPlaying(true);
      score.setLifeGauge(-1);
      break;
    case '+':
      score.addScore(1);
      break;
    case 'f':
      player.fallDown();
      break;
  }
  console.log(key);
}

function subscribeSubjects() {
  player.subscribe(stairs);
  player.subscribe(score);
  player.subscribe(buttons);

  score.subscribe(player);
  stairs.subscribe(player);
}

function gameOver() {
  console.log("Player callback!");
  SCENE = 3;  // game is over
  scene = new GameOverScene();
}

// function drawIntroScene() {
//   bg.draw();
//   stairs.draw();
//   player.draw();
// }

// function drawPlayScene() {
  
// }

// function drawGameOverScene() {
//   bg.draw();
//   stairs.draw();
//   player.draw();
// }