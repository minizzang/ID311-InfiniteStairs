import '../css/style.css';
import {sketch} from 'p5js-wrapper';

import { Background } from './Background.js';
import { ScoreDisplay } from './ScoreDisplay.js'
import { Player } from './Player';
import { ButtonDisplay } from './Button';
import { Stairs } from './Stairs';

import { GAME_WIDTH, GAME_HEIGHT, STEP_NUM } from './Constants';

let bg, score, player, buttons, stairs;

sketch.setup = function(){
  createCanvas (GAME_WIDTH, GAME_HEIGHT);

  bg = new Background(400, 300, 1200);
  score = new ScoreDisplay();
  player = new Player(GAME_WIDTH/2, GAME_HEIGHT*0.66, 100);
  buttons = new ButtonDisplay(GAME_WIDTH, GAME_HEIGHT*0.9, 110);
  stairs = new Stairs(GAME_HEIGHT*0.645);
  stairs.getStairs(STEP_NUM);

  subscribeSubjects();
}

sketch.draw= function(){
  bg.draw();
  stairs.draw();
  buttons.draw();
  score.draw();
  player.draw();
}

sketch.mousePressed = function(){
}

sketch.keyPressed = function() {
  switch (key) {
    case 'ArrowLeft':
      // player change direction
      player.changeDirection();
      buttons.isClicked(1);
      break;
    case 'ArrowRight':
      // player go upstair
      player.goUpStairs();
      buttons.isClicked(2);
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