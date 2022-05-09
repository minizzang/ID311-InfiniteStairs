import workerInitial from '../assets/workerInitial.png';
import workerLeft from '../assets/workerLeft.png';
import workerRight from '../assets/workerRight.png';

class Character {
  constructor(x, y, width){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 0;
    this.img = loadImage(workerInitial, ()=>{
      this.height = this.img.height/this.img.width*this.width;
    });
    this.imgRight = loadImage(workerRight, ()=>{
      this.height = this.img.height/this.img.width*this.width;
    });
    this.imgLeft = loadImage(workerLeft, ()=>{
      this.height = this.img.height/this.img.width*this.width;
    });
    this.state = 'initial'  // initial, L, R, failling
  }

  draw(){
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.width, this.height);
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

  goUpStairs(){
    
  }
}

export { Character }