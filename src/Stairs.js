import brick from '../assets/brick.png'

class Stairs {
  constructor(){
    this.steps = [];
  }

  draw(){

  }

}

class normalStep {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.stepImg = loadImg(brick);
  }
}

export { Stairs }