import workerInitial from '../assets/workerInitial.png';
import workerLeft from '../assets/workerLeft.png';
import workerRight from '../assets/workerRight.png';
import workerFallLeft from '../assets/workerFallLeft.png';
import workerFallRight from '../assets/workerFallRight.png';
import fallEffectLeft from '../assets/fallEffectLeft.png';
import fallEffectRight from '../assets/fallEffectRight.png';

import { Subject } from './Subject';
import { STEP_WIDTH_RATIO, STEP_WH_RATIO } from './Constants';

class Player extends Subject {
  constructor(x, y, width){
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 0;
    
    this.img = loadImage(workerInitial, ()=> {
      this.height = this.img.height/this.img.width*this.width;
    });
    this.imgRight = loadImage(workerRight);
    this.imgLeft = loadImage(workerLeft);
    this.imgFallLeft = loadImage(workerFallLeft);
    this.imgFallRight = loadImage(workerFallRight);
    this.imgFallEffectLeft = loadImage(fallEffectLeft);
    this.imgFallEffectRight = loadImage(fallEffectRight);

    this.state = 'initial';        // initial, L, R, fallL, fallR
    this.gameState = 'ready';      // ready, start, end
    this.upCount = 0;
  }

  draw(){
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.width, this.height);
    if (this.state == 'fallL') {
      image(this.imgFallEffectLeft, this.x+this.width/2+15, this.y-this.height/3, 30, 60);
      if (this.y < height) this.y += 10;
    }
    else if (this.state == 'fallR') {
      image(this.imgFallEffectRight, this.x-this.width/2-15, this.y-this.height/3, 30, 60);
      if (this.y < height) this.y += 10;
    }
  }

  changeDirection(){
    if (this.state == 'L'){
      this.state = 'R';
      this.img = this.imgRight;
    } else {
      this.state = 'L';
      this.img = this.imgLeft;
    }
  }

  goUpStairs(){ // p5 play.js animation 이용하기
    const STEP_HEIGHT = width/(STEP_WIDTH_RATIO*STEP_WH_RATIO);
    
    if (this.state == 'initial') {
      this.changeDirection();
      this.gameState = 'start';
      this.notifySubscribers('playerGameState', this.gameState);
    }
    if (this.upCount < 2) {   // for liveness, player's y pos decreases first two steps 
      this.y -= STEP_HEIGHT;
    }
    this.upCount += 1;
    this.notifySubscribers('playerGoUp', this.state, this.upCount);
  }

  fallDown(){
    if (this.state == 'L') {
      this.img = this.imgFallLeft;
      this.state = 'fallL';
    }
    else if (this.state == 'R') {
      this.img = this.imgFallRight;
      this.state = 'fallR';
    }
  }

  update(source, ...others) {
    // notice from scoreDisplay to alert life gauge is done
    if (source == 'scoreTimeout') {
      // this.
    }
    // notice from stair to check player is fall or not
  }
}

export { Player }