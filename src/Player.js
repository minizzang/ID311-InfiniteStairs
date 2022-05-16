import workerInitial from '../assets/Images/worker/workerInitial.png';
import workerLeft1 from '../assets/Images/worker/workerLeft1.png';
import workerLeft2 from '../assets/Images/worker/workerLeft2.png';
import workerLeft3 from '../assets/Images/worker/workerLeft3.png';
import workerRight1 from '../assets/Images/worker/workerRight1.png';
import workerRight2 from '../assets/Images/worker/workerRight2.png';
import workerRight3 from '../assets/Images/worker/workerRight3.png';
import workerFallLeft from '../assets/Images/worker/workerFallLeft.png';
import workerFallRight from '../assets/Images/worker/workerFallRight.png';
import fallEffectLeft from '../assets/Images/objects/fallEffectLeft.png';
import fallEffectRight from '../assets/Images/objects/fallEffectRight.png';
import bag from '../assets/Images/objects/bag.png';

import { Subject } from './Subject';
import { STEP_WIDTH_RATIO, STEP_WH_RATIO } from './Constants';

class Player extends Subject {
  constructor(x, y, width){
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 0;
    this.lastX = 0;
    this.lastY = 0;
    
    this.img = loadImage(workerInitial, ()=> {
      this.defaultHeight = this.img.height/this.img.width*this.width;
      this.height = this.defaultHeight;
    });
    this.imgRight1 = loadImage(workerRight1);
    this.imgRight2 = loadImage(workerRight2);
    this.imgRight3 = loadImage(workerRight3);
    this.imgLeft1 = loadImage(workerLeft1);
    this.imgLeft2 = loadImage(workerLeft2);
    this.imgLeft3 = loadImage(workerLeft3);
    this.imgFallLeft = loadImage(workerFallLeft);
    this.imgFallRight = loadImage(workerFallRight);
    this.imgFallEffectLeft = loadImage(fallEffectLeft);
    this.imgFallEffectRight = loadImage(fallEffectRight);
    this.bag = loadImage(bag);
    this.bagY = 0;

    this.stepSound = loadSound('../assets/Sounds/step.wav');
    this.stepSound.setVolume(0.08);
    this.fall1Sound = loadSound('../assets/Sounds/fall1.wav');
    this.fall2Sound = loadSound('../assets/Sounds/fall2.wav');

    this.state = 'initial';        // initial, L, R, fall
    this.gameState = 'ready';      // ready, playing, end
    this.upCount = 0;
    this.bagVisible = false;
    this.effectVisible = false;
  }
  
  registerCallback(callback) {
    this._callback = callback;
  }

  draw(){
    imageMode(CENTER);
    if (this.bagVisible) {
      image(this.bag, this.lastX, this.bagY, 80, 50);
      (this.bagY < this.lastY) ? this.bagY += 10 : "";
    }
    image(this.img, this.x, this.y, this.width, this.height);
    if (this.effectVisible && this.state == 'L') {
      image(this.imgFallEffectLeft, this.x+this.width/2+15, this.y-this.height/3, 30, 60);}
    else if (this.effectVisible && this.state == 'R') {
      image(this.imgFallEffectRight, this.x-this.width/2-15, this.y-this.height/3, 30, 60);}
    if (this.state == 'fall') {
      if (this.y < height) this.y += 15;
    }
    // animation(this.goUpAnimation, width/2, 150);
  }

  changeDirection(){
    if (this.state == 'initial') {
      this.state = 'R';
      this.goUpStairs();
      this.fallDown();
    }
    else if (this.state == 'L'){
      this.state = 'R';
      this.goUpStairs();
    }
    else if (this.state == 'R'){
      this.state = 'L';
      this.goUpStairs();
    }
  }

  async goUpAnimation(){
    let defaultHight = this.height;
    if (this.state == 'L'){
      this.img = this.imgLeft1;
      this.height += 40;
      this.width = this.img.width/this.img.height*this.height;
      await this.delay(30);
      this.img = this.imgLeft2;
      this.width = this.img.width/this.img.height*this.height;
      await this.delay(20);
      this.img = this.imgLeft3;
      this.height = defaultHight;
      this.width = this.img.width/this.img.height*this.height;
    }
    else if (this.state == 'R'){
      this.img = this.imgRight1;
      this.height += 40;
      this.width = this.img.width/this.img.height*this.height;
      await this.delay(30);
      this.img = this.imgRight2;
      this.width = this.img.width/this.img.height*this.height;
      await this.delay(20);
      this.img = this.imgRight3;
      this.height = defaultHight;
      this.width = this.img.width/this.img.height*this.height;
    }
  }

  goUpStairs(){
    if (this.gameState != 'end') {
      this.stepSound.play();
      const STEP_HEIGHT = width/(STEP_WIDTH_RATIO*STEP_WH_RATIO);
      if (this.state == 'initial') {
        this.state = 'L';
        this.gameState = 'playing';
        this.notifySubscribers('playerGameState', this.gameState);
      }
      if (this.upCount < 2) {   // for liveness, player's y pos decreases first two steps 
        this.y -= STEP_HEIGHT;
      }
      this.upCount += 1;
      this.goUpAnimation();
      this.notifySubscribers('playerGoUp', this.state, this.upCount, this.x, this.y, this.height);
    }
  }

  async fallDown(){
    await this.delay(300);
    if (this.state == 'L') this.img = this.imgFallLeft;
    else if (this.state == 'R') this.img = this.imgFallRight;
    
    this.fall1Sound.play();
    this.effectVisible = true;

    await this.delay(100);
    this.bagVisible = true;

    await this.delay(600);
    this.state = 'fall';

    this.fall2Sound.play();
  }

  gameOver(cause){
    this.gameState = 'end';
    this.fallDown();
    this.notifySubscribers('playerGameState', this.gameState, cause);

    if (this._callback) {   // callback for main.js
      this._callback();
    }
  }

  update(source, ...others) {
    // notice from scoreDisplay to alert life gauge is done
    if (source == 'scoreTimeout') {
      this.gameOver('timeout');
    }
    // notice from stair to check player is fall or not
    if (source == 'stairFall') {
      this.gameOver('fall');
      this.lastX = others[0].x;
      this.lastY = others[0].y-40;
      this.bagY = others[0].y-100;
    }
    // lastStep for scoreTimeout gameover
    if (source == 'lastStep') {
      this.lastX = others[0].x;
      this.lastY = others[0].y-40;
      this.bagY = others[0].y-100;
    }
  }

  getGameState(){
    return this.gameState;
  }

  delay(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms))
  }
}

export { Player }