import background from '../assets/Images/objects/background.png';

class Background {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.width = 800;
    this.height = 3000;
    this.image = loadImage(background, ()=>{
      // this.height = this.image.height/this.image.width*this.width; 
    });
  }

  draw(){
    imageMode(CENTER);
    image(this.image, this.x, this.y, this.width, this.height);
  }

  movePosition(x, y){
    this.x += x;
    this.y += y;
  }

  update(source, ...others) {
    // notice from stairs moving
    if (source == 'moveStairs') {
      switch (others[0]) {
        case 'L':
          this.movePosition(10, 10);
          break;
        case 'R':
          this.movePosition(-10, 10);
          break;
      }
    }
  }
}

export { Background }