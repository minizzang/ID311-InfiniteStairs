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

import { Subject } from './Subject';
import { STEP_WIDTH_RATIO, STEP_WH_RATIO } from './Constants';

class Player extends Subject {
  constructor(x, y, width, goUpAnimation){
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 0;
    // this.goUpAnimation = goUpAnimation;
    
    this.img = loadImage(workerInitial, ()=> {
      this.height = this.img.height/this.img.width*this.width;
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

    // this.stepRightAni = createSprite(600, 200);
	  // this.stepRightAni.addAnimation('normal', '../assets/Images/worker/workerRight1.png', '../assets/Images/worker/workerRight3.png');
    // this.stepRightAni = loadAnimation('../assets/Images/worker/workerRight1.png', '../assets/Images/worker/workerRight3.png');
    this.stepScound = loadSound('../assets/Sounds/step.wav');
    this.stepScound.setVolume(0.08);
    this.fall1Sound = loadSound('../assets/Sounds/fall1.wav');
    this.fall2Sound = loadSound('../assets/Sounds/fall2.wav');

    this.state = 'initial';        // initial, L, R, fallL, fallR
    this.gameState = 'ready';      // ready, playing, end
    this.upCount = 0;
    this.effectVisible = false;
  }
  
  registerCallback(callback) {
    this._callback = callback;
  }

  draw(){
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.width, this.height);
    if (this.effectVisible && this.state == 'L') {
      image(this.imgFallEffectLeft, this.x+this.width/2+15, this.y-this.height/3, 30, 60);}
    else if (this.effectVisible && this.state == 'R') {
      image(this.imgFallEffectRight, this.x-this.width/2-15, this.y-this.height/3, 30, 60);}
    if (this.state == 'fallL' || this.state == 'fallR') {
      if (this.y < height) this.y += 15;
    }
    // animation(this.goUpAnimation, width/2, 150);
  }

  async changeDirection(){
    if (this.state == 'initial') {
      this.state = 'L';
      this.img = this.imgLeft;
    }
    else if (this.state == 'L'){
      this.state = 'R';
      this.goUpStairs();
    }
    else if (this.state == 'R'){
      this.state = 'L';
      this.img = this.imgLeft;
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
      await this.delay(30);
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
      await this.delay(30);
      this.img = this.imgRight3;
      this.height = defaultHight;
      this.width = this.img.width/this.img.height*this.height;
    }
  }

  goUpStairs(){ // p5 play.js animation 이용하기
    if (this.gameState != 'end') {
      this.stepScound.play();
      const STEP_HEIGHT = width/(STEP_WIDTH_RATIO*STEP_WH_RATIO);
      if (this.state == 'initial') {
        this.changeDirection();
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
    await this.delay(700);
    
    this.state = 'fallL';
    this.state = 'fallR';

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