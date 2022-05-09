import '../css/style.css';
import {sketch} from 'p5js-wrapper';

import { Background } from './Background.js';
import { ScoreDisplay } from './ScoreDisplay.js'

let bg, score;

sketch.setup = function(){
  createCanvas (windowHeight*0.7, windowHeight);

  bg = new Background(400, 300, 1200);
  score = new ScoreDisplay();
}

sketch.draw= function(){
  bg.draw();
  score.draw();
}

sketch.mousePressed = function(){
  console.log('here');
}

sketch.keyPressed = function() {
  switch (key) {
    case 'ArrowUp':
      bg.setPosition(bg.x, bg.y+10);
      break;
    case 'ArrowDown':
      bg.setPosition(bg.x, bg.y-10);
      break;
    case 'ArrowLeft':
      bg.setPosition(bg.x+10, bg.y);
      break;
    case 'ArrowRight':
      bg.setPosition(bg.x-10, bg.y);
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
