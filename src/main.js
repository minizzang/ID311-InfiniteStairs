import '../css/style.css';
import {sketch} from 'p5js-wrapper';

import { Background } from './Background.js';
import { ScoreDisplay } from './ScoreDisplay.js'
import { Character } from './Character';
import { ButtonDisplay } from './Button';

let WIDTH, HEIGHT;
let bg, score, player, buttons;

sketch.setup = function(){
  HEIGHT = windowHeight;
  WIDTH = HEIGHT*0.7;
  createCanvas (WIDTH, HEIGHT);

  bg = new Background(400, 300, 1200);
  score = new ScoreDisplay();
  player = new Character(WIDTH/2, HEIGHT*0.8, 100);
  buttons = new ButtonDisplay(WIDTH, HEIGHT*0.9, 120);
}

sketch.draw= function(){
  bg.draw();
  score.draw();
  player.draw();
  buttons.draw();
}

sketch.mousePressed = function(){
  console.log('here');
}

sketch.keyPressed = function() {
  switch (key) {
    // case 'ArrowUp':
    //   bg.setPosition(bg.x, bg.y+10);
    //   break;
    // case 'ArrowDown':
    //   bg.setPosition(bg.x, bg.y-10);
    //   break;
    case 'ArrowLeft':
      // character change direction
      player.changeDirection();
      buttons.isClicked(1);
      break;
    case 'ArrowRight':
      // character go upstair
      buttons.isClicked(2);
      break;
    case ' ':
      score.setIsPlaying(true);
      score.setLifeGauge(-1);
      break;
    case '+':
      score.addScore(1);
      break;
  }
  console.log(key);
}
