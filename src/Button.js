import btnChangeDir from '../assets/Images/buttons/btnChangeDir.png';
import btnGoUp from '../assets/Images/buttons/btnGoUp.png';
import btnPlay from '../assets/Images/buttons/btnPlay.png';

import { BTN_SIZE } from './Constants';

class Button {
  constructor(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = undefined;
  }

  draw(){
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.width, this.height);
  }

  isClicked(mx, my){
    if (mx > this.x+this.width/2) return false;
    if (mx < this.x-this.width/2) return false;
    if (my > this.y+this.height/2) return false;
    if (my < this.y-this.height/2) return false;
    return true;
  }

  async clickEffect(){
    const delay = (ms) => new Promise((resolve)=>setTimeout(resolve, ms));

    this.width -= 30;
    this.height -= 30;

    await delay(20);

    this.width += 30;
    this.height += 30;
  }
}

class PlayButton extends Button {
  constructor(x, y, width, height){
    super(x, y, width, height);
    this.img = loadImage(btnPlay);
  }
}

class DirectionButton extends Button {
  constructor(x, y, width){
    super(x, y, width, width);
    this.img = loadImage(btnChangeDir);
  }
}

class UpButton extends Button {
  constructor(x, y, width){
    super(x, y, width, width);
    this.img = loadImage(btnGoUp);
  }
}

class ButtonDisplay {
  constructor(width, height, btnSize){
    this.width = width;
    this.height = height;
    this.btnSize = btnSize;
    this.DirBtn = new DirectionButton(width*0.2, height, btnSize);
    this.UpBtn = new UpButton(width*0.8, height, btnSize);
    this.visible = true;
    this.guideVisible = true;
  }

  draw(){
    if (this.visible) {
      if (this.guideVisible) {
        rectMode(CENTER);
        noStroke();
        
        fill(94, 25, 8, 200);
        rect(this.DirBtn.x, this.DirBtn.y-BTN_SIZE/2, this.DirBtn.width-20, this.DirBtn.height, 20);
        textAlign(CENTER);
        fill(255);
        text("change\ndirection", this.DirBtn.x, this.DirBtn.y-BTN_SIZE/2-30);

        fill(94, 25, 8, 200);
        rect(this.UpBtn.x, this.UpBtn.y-BTN_SIZE/2, this.UpBtn.width-20, this.UpBtn.height, 20);
        textAlign(CENTER);
        fill(255);
        text("go up", this.UpBtn.x, this.UpBtn.y-BTN_SIZE/2-20);
      }
      
      this.DirBtn.draw();
      this.UpBtn.draw();
    }
  }

  update(source, ...others) {
    if (source == 'playerGameState') {
      if (others[0] == 'end') this.visible = false;
    }
    if (source == 'playerGoUp') {
      if (others[1]>10) this.guideVisible = false;
    }
  }
}

export { PlayButton, ButtonDisplay }