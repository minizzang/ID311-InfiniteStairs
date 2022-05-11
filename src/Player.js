import workerInitial from '../assets/workerInitial.png';
import workerLeft from '../assets/workerLeft.png';
import workerRight from '../assets/workerRight.png';
import workerFallLeft from '../assets/workerFallLeft.png';
import workerFallRight from '../assets/workerFallRight.png';
import fallEffectLeft from '../assets/fallEffectLeft.png';
import fallEffectRight from '../assets/fallEffectRight.png';

import { Subject } from './Subject';

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

    this.state = 'initial'       // initial, L, R, fallL, fallR
    this.gameState = 'ready'     // ready, start, end
  }

  draw(){
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.width, this.height);
    if (this.state == 'fallL') {
      image(this.imgFallEffectLeft, this.x+this.width/2+15, this.y-this.height/3, 30, 60);
    }
    else if (this.state == 'fallR') {
      image(this.imgFallEffectRight, this.x-this.width/2-15, this.y-this.height/3, 30, 60);
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
    if (this.state == 'initial') {
      this.changeDirection();
      this.gameState = 'start';
      this.notifySubscribers('playerGameState', this.gameState);
    }
    this.notifySubscribers('playerGoUp', this.state);
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
    
    for (let i=0; i<height; i++) {
      this.Y += 1;
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