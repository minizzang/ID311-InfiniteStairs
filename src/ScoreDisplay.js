import { SCORE_FONT_SIZE, MAX_LIFE_GAUGE } from './Constants';
import { Subject } from './Subject';

class ScoreDisplay extends Subject {
  constructor(){
    super();
    this.score = 0;
    this.lifeGauge = MAX_LIFE_GAUGE/2;
    this.font = loadFont('../assets/PixelMaster.ttf');
    this.leftTopCornerX = (width-width*0.7)/2;
    this.isPlaying = false;       // true when run the game, false when game is over or not yet started.
    this.difficulty = 1;          // difficulty(level) of the stage.
  }

  draw(){
    strokeWeight(6);
    fill(100, 50, 25);
    rect(this.leftTopCornerX, 40, width*0.7, 30);
    
    strokeWeight(0);
    fill(255, 0, 0);
    rect(this.leftTopCornerX+3, 43, this.lifeGauge/MAX_LIFE_GAUGE*width*0.7, 24);

    textAlign(CENTER);
    textFont(this.font);
    textSize(SCORE_FONT_SIZE);
    stroke(0);  // change color
    strokeWeight(10);
    fill(255);
    text(`${this.score}`, width/2, 120);
  }

  setIsPlaying(isPlaying){
    this.isPlaying = isPlaying;
  }

  addScore(amount){
    this.score += amount;
  }

  setLifeGauge(amount){
    if (this.isPlaying) {
      let intervalId = setInterval(() => {
        if (!this.lifeGauge == 0) {
          this.lifeGauge += amount;
        } else {
          clearInterval(intervalId);
          this.notifySubscribers('timeout');
        }
      }, 500/this.difficulty);
    }
  }

  update(source, ...others){  // from stairs or character to update score

  }
}

export { ScoreDisplay }