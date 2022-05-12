

import { PlayScene } from "./PlayScene";
import { Scene } from "./Scene";

import { GAMEOVER_FS, BTN_SIZE } from "../Constants";
import { PlayButton } from '../Button';

class GameOverScene extends Scene {
  constructor(bg, player, stairs, score) {
    super(3);
    this.bg = bg;
    this.player = player;
    this.stairs = stairs;
    this.score = score;

    this.btnPlay = new PlayButton (width/2, height*0.9, BTN_SIZE, BTN_SIZE*0.8);
  }

  draw() {
    this.bg.draw();
    this.stairs.draw();
    this.player.draw();

    fill(255);
    textSize(GAMEOVER_FS);
    stroke(172, 62, 26);
    strokeWeight(20);
    textStyle(BOLD);
    text("GAME OVER", width/2, 120);

    rectMode(CENTER);
    strokeWeight(10);
    fill(255, 227, 147, 150);
    rect(width/2, height*0.45, width*0.8, width*0.8);

    // TODO: design
    text("BEST SCORE", width/2, height*0.3);
    text("516", width/2, height*0.4);
    text("SCORE", width/2, height*0.5);
    text(`${this.score}`, width/2, height*0.6);

    this.btnPlay.draw();
  }

  checkBtnPressed(obj) { // play button, ...
    if (obj == 'play') {
      return this.btnPlay.isClicked(mouseX, mouseY);
    }
  }

  nextScene(bg, player, stairs) {
    return new PlayScene(bg, player, stairs);
  }
}

export { GameOverScene }