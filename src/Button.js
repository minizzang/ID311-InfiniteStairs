import btnChangeDir from '../assets/btnChangeDir.png';
import btnGoUp from '../assets/btnGoUp.png';

class Button {
  constructor(x, y, width){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = width;
    this.img = undefined;
  }

  draw(){
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.width, this.height);
  }
}

class DirectionButton extends Button {
  constructor(x, y, width){
    super(x, y, width);
    this.img = loadImage(btnChangeDir);
  }
}

class UpButton extends Button {
  constructor(x, y, width){
    super(x, y, width);
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
  }

  draw(){
    this.DirBtn.draw();
    this.UpBtn.draw();
  }

  isClicked(index){   // 1: direction button, 2: climb button
    switch (index){
      case 1:
        // btn click animation
        // notify stairs?
      case 2:
        
    }
  }
}

export { ButtonDisplay }