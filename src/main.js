import '../css/style.css';
import {sketch} from 'p5js-wrapper';

import { Background } from './Background.js';

let bg;

sketch.setup = function(){
  createCanvas (800, 600);

  bg = new Background(400, 300, 1200);
}

sketch.draw= function(){
  background(100);
  fill(255, 0, 0);
  noStroke();
  rectMode(CENTER);
  rect(mouseX, mouseY, 50, 50);

  bg.draw();
}

sketch.mousePressed = function(){
  console.log('here');
}

sketch.keyPressed = function() {  // 나중에 switch 문으로 변경
  if (key === 'ArrowUp') bg.setPosition(bg.x, bg.y+10);
  else if (key === 'ArrowDown') bg.setPosition(bg.x, bg.y-10);
  else if (key === 'ArrowLeft') bg.setPosition(bg.x+10, bg.y);
  else if (key === 'ArrowRight') bg.setPosition(bg.x-10, bg.y);

  console.log(key);
}
