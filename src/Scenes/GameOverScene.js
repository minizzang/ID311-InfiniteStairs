

import { PlayScene } from "./PlayScene";
import { Scene } from "./Scene";

import { GAMEOVER_FS, ATTRIBUTE_SIZE_M, ATTRIBUTE_SIZE_L, TEXT_SIZE_L, TEXT_SIZE_M, BTN_SIZE } from "../Constants";
import { PlayButton } from '../Button';

class GameOverScene extends Scene {
  constructor(bg, player, stairs, score) {
    super(3);
    this.bg = bg;
    this.player = player;
    this.stairs = stairs;
    this.score = score;
    this.bestScore = 0;

    this.btnPlay = new PlayButton (width/2, height*0.9, BTN_SIZE, BTN_SIZE*0.8);
  }

  setBestScore(storedBestScore) {
    this.bestScore = storedBestScore;
    
    if (this.score > storedBestScore) {
      localStorage.setItem('bestScore', this.score);
      this.bestScore = this.score;
    }
  }

  draw() {
    textAlign(CENTER);
    this.bg.draw();
    this.stairs.draw();
    this.player.draw();

    fill(255);
    stroke(93, 25, 8);
    textSize(GAMEOVER_FS);
    strokeWeight(15);
    textStyle(BOLD);
    text("GAME OVER", width/2, 120);
    
    rectMode(CENTER);
    strokeWeight(8);
    fill(255, 227, 147, 150);
    rect(width/2, height*0.45, width*0.8, width*0.8, 20);

    strokeWeight(10);
    textSize(ATTRIBUTE_SIZE_M);
    text("BEST SCORE", width/2, height*0.3);
    textSize(ATTRIBUTE_SIZE_L);
    fill(214, 253, 88);
    text("SCORE", width/2, height*0.5);
    
    fill(242, 242, 227);
    textSize(TEXT_SIZE_M);
    text(`${this.bestScore}`, width/2, height*0.4);
    textSize(TEXT_SIZE_L);
    text(`${this.score}`, width/2, height*0.6);

    this.btnPlay.draw();
  }

  checkBtnPressed(obj) { // play button, ...
    if (obj == 'play') {
      if (this.btnPlay.isClicked(mouseX, mouseY)) {
        this.btnPlay.clickEffect();
        return true;
      }
    }
  }

  nextScene(bg, player, stairs) {
    return new PlayScene(bg, player, stairs);
  }
}

export { GameOverScene }