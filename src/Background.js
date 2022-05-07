import background from '../assets/tempBg.jpg';

class Background {
  constructor(x, y, width){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 0;
    this.image = loadImage(background, ()=>{
      this.height = this.image.height/this.image.width*this.width;
    });
  }

  draw(){
    imageMode(CENTER);
    image(this.image, this.x, this.y, this.width, this.height);
  }

  setPosition(x, y){
    this.x = x;
    this.y = y;
  }
}

export { Background }