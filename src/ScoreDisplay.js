import { SCORE_FONT_SIZE, MAX_LIFE_GAUGE } from './Constants';
import { Subject } from './Subject';

class ScoreDisplay extends Subject {
  constructor(){
    super();
    this.score = 0;
    this.lifeGauge = MAX_LIFE_GAUGE/2;
    this.leftTopCornerX = (width-width*0.7)/2;
    this.isPlaying = false;       // true when run the game, false when game is over or not yet started.
  }

  draw(){
    rectMode(CORNER);
    stroke(0);

    strokeWeight(6);
    fill(100, 50, 25);
    rect(this.leftTopCornerX, 40, width*0.7, 30);
    
    strokeWeight(0);
    fill(255, 0, 0);
    rect(this.leftTopCornerX+3, 43, this.lifeGauge/MAX_LIFE_GAUGE*width*0.7, 24);

    textAlign(CENTER);
    textSize(SCORE_FONT_SIZE);
    stroke(0);  // change color
    strokeWeight(10);
    fill(255);
    text(`${this.score}`, width/2, 140);

    this.setLifeGauge('reduce');
  }

  setIsPlaying(isPlaying){
    this.isPlaying = isPlaying;
  }

  getScore(){
    return this.score;
  }

  setScore(amount){
    this.score = amount;
  }

  setLifeGauge(type){
    if (this.isPlaying) {
      if (type == 'reduce') {
        if (!(this.lifeGauge <= 0)) {
          let amount;
          if (this.score < 10) amount = 0.1;
          else if (this.score < 30) amount = 0.2;
          else if (this.score < 100) amount = 0.3;
          else if (this.score < 300) amount = 0.4;
          else amount = 0.5;
          this.lifeGauge -= amount;
        } else {
          this.notifySubscribers('scoreTimeout');
        }
      }
      else if (type == 'add') {
        let amount;
        if (this.score < 10) amount = 10;
        else if (this.score < 30) amount = 8;
        else if (this.score < 100) amount = 6;
        else if (this.score < 300) amount = 5;
        else amount = 4;
        (this.lifeGauge + amount > MAX_LIFE_GAUGE) ? this.lifeGauge = MAX_LIFE_GAUGE : this.lifeGauge = this.lifeGauge + amount;
      }
    }
  }

  update(source, ...others){  // from stairs or player to update score
    if (source == 'playerGameState') {
      switch (others[0]) {
        case 'playing':
          this.setIsPlaying(true);
          break;
        case 'end':
          this.setIsPlaying(false);
          break;
      }
    }
    else if (source == 'playerGoUp' && this.isPlaying) {
      this.setScore(others[1]);
      this.setLifeGauge('add');
    }
  }
}

export { ScoreDisplay }