import btnChangeDir from '../assets/Images/buttons/btnChangeDir.png';
import btnGoUp from '../assets/Images/buttons/btnGoUp.png';
import btnPlay from '../assets/Images/buttons/btnPlay.png';

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
  }

  draw(){
    if (this.visible) {
      this.DirBtn.draw();
      this.UpBtn.draw();
    }
  }

  update(source, ...others) {
    if (source == 'playerGameState') {
      if (others[0] == 'end') this.visible = false;
    }
  }
}

export { PlayButton, ButtonDisplay }