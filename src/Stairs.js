import brick from '../assets/Images/objects/brick.png'

import { Subject } from './Subject';
import { STEP_WIDTH_RATIO, STEP_WH_RATIO, STEP_FALL_ERR } from './Constants';

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
    this.lastStep = 0;
  }

  draw() {
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
          this.lastStep = stepObj;
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

  moveStairs(direction, isMove) {
    let stepObj, amountX, amountY;
    const STEP_WIDTH = width/STEP_WIDTH_RATIO;
    const STEP_HEIGHT = width/(STEP_WIDTH_RATIO*STEP_WH_RATIO);

    (isMove <= 2) ? amountY = 0 : amountY = STEP_HEIGHT;

    if (direction == 'L') {
      amountX = STEP_WIDTH;
    } else if (direction == 'R') {
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

  checkIsFall(Px, Py, Pheight) {
    let isFall = true;
    for (let i = 0; i<this.stairArray.length; i++) {
      let step = this.stairArray[i];
      if (Px > step.x - STEP_FALL_ERR
      && Px <= step.x + STEP_FALL_ERR
      && Py + Pheight/2 > step.y - step.height/2 - STEP_FALL_ERR
      && Py + Pheight/2 <= step.y - step.height/2 + STEP_FALL_ERR) {
        isFall = false;
        this.lastStep = this.stairArray[i];
        break;
      }
    }
    if (isFall == true) {
      this.notifySubscribers('stairFall', this.lastStep);
    } else {
      this.notifySubscribers('lastStep', this.lastStep)
    }
  }

  update(source, ...others) {
    // notice from player step Up
    if (source == 'playerGoUp') {
      /*
      others = [
        'player.state', 'player.upCount',
        'player.x', 'player.y', 'player.height']
      */
      this.moveStairs(others[0], others[1]);
      this.checkIsFall(others[2], others[3], others[4]);
    }
  }

}

export { Stairs }