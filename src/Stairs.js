import brick from '../assets/brick.png'

import { Subject } from './Subject';
import { STEP_WIDTH_RATIO, STEP_WH_RATIO } from './Constants';

class Step {
  constructor(x, y, width){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 0;
    this.img = loadImage(brick, ()=>{
      this.height = this.img.height/this.img.width*this.width;
    });
  }

  draw() {
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.width, this.height);
  }

  getXY() {
    return {x: this.x, y: this.y};
  }

  moveXY(amountX, amountY) {
    this.x += amountX;
    this.y += amountY;
  }
}

class Stairs extends Subject {
  constructor(startHeight) {
    super();
    this.state = 'init'; // init, left, right
    this.startHeight = startHeight;
    this.stairArray = [];
    this.lastPosition = {x: 0, y: 0};
  }

  draw() {
    imageMode(CORNER);
    for (let step of this.stairArray) {
      step.draw();
    }
  }

  getStairs(num) {
    let stepObj, newX, newY;
    const STEP_WIDTH = width/STEP_WIDTH_RATIO;
    const STEP_HEIGHT = width/(STEP_WIDTH_RATIO*STEP_WH_RATIO);
    const X = width/2-STEP_WIDTH;
    const Y = this.startHeight+2*STEP_HEIGHT;

    for (let i=0; i<num; i++) {
      const lastX = this.lastPosition.x;
      const lastY = this.lastPosition.y;

      switch (this.state) {
        case 'init':
          stepObj = new Step(X, Y, STEP_WIDTH);
          this.stairArray.push(stepObj);
          this.lastPosition = {x: X, y: Y};
          break;
        case 'left':
          newX = lastX-STEP_WIDTH;
          newY = lastY-STEP_HEIGHT;
          stepObj = new Step(newX, newY, STEP_WIDTH);
          this.stairArray.push(stepObj);
          this.lastPosition = {x: newX, y: newY};
          break;
        case 'right':
          newX = lastX+STEP_WIDTH;
          newY = lastY-STEP_HEIGHT;
          stepObj = new Step(newX, newY, STEP_WIDTH);
          this.stairArray.push(stepObj);
          this.lastPosition = {x: newX, y: newY};
          break;
      }

      if (this.stairArray.length == 1) {
        this.state = 'left';    // always start with left step
      } else {
        if (Math.random() > 0.6) {   // TODO: may have to change this logit
          this.state == 'left' ? this.state = 'right' : this.state = 'left';
        }
      }
    }
  }

  moveStairs(direction) {
    let stepObj, amountX, amountY;
    const STEP_WIDTH = width/STEP_WIDTH_RATIO;
    const STEP_HEIGHT = width/(STEP_WIDTH_RATIO*STEP_WH_RATIO);

    amountY = STEP_HEIGHT;
    if (direction == 'left') {
      amountX = STEP_WIDTH;
    } else if (direction == 'right') {
      amountX = -STEP_WIDTH;
    }

    for (let i=0; i<this.stairArray.length; i++) {
      stepObj = this.stairArray[i];
      stepObj.moveXY(amountX, amountY);
    }
    if (this.stairArray[0].getXY().y > height) {
      this.stairArray.splice(0, 1);
      this.lastPosition = this.stairArray.at(-1).getXY();
      this.getStairs(1);
    }
  }

  update(source, ...others) {
    // notice from character step Up
    if (source == 'character') {
      switch (others[0]) {
        case 'L':
          this.moveStairs('left');
          break;
        case 'R':
          this.moveStairs('right');
          break;
      }
    }
  }

}

export { Stairs }