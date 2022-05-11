import { GameOverScene } from "./GameOverScene";
import { Scene } from "./Scene";

import { ButtonDisplay } from '../Button';
import { ScoreDisplay } from '../ScoreDisplay.js'

import { GAME_WIDTH, GAME_HEIGHT, STEP_NUM } from '../Constants';


class PlayScene extends Scene {
  constructor(bg, player, stairs) {
    super(2);
    this.bg = bg;
    this.stairs = stairs;
    this.player = player;
    this.score = new ScoreDisplay();
    this.buttons = new ButtonDisplay(GAME_WIDTH, GAME_HEIGHT*0.9, 110);

    this.subscribeSubjects();
  }

  draw() {
    this.bg.draw();
    this.stairs.draw();
    this.score.draw();
    this.player.draw();
    this.buttons.draw();
  }

  mousePressed() {
    console.log('play');
    console.log('change to gameOver');
    this.nextScene();
  }
  
  keyPressed() {
    console.log(key);

    switch (key) {
      case 'ArrowLeft':
        // player change direction
        this.player.changeDirection();
        this.buttons.isClicked(1);
        break;
      case 'ArrowRight':
        // player go upstair
        this.player.goUpStairs();
        this.buttons.isClicked(2);
        break;
      case ' ':
        this.score.setIsPlaying(true);
        this.score.setLifeGauge(-1);
        break;
      case '+':
        this.score.addScore(1);
        break;
      case 'f':
        this.player.fallDown();
        break;
    }
  }

  subscribeSubjects() {
    this.player.subscribe(this.stairs);
    this.player.subscribe(this.score);
    this.player.subscribe(this.buttons);

    this.score.subscribe(this.player);
    this.stairs.subscribe(this.player);
  }

  nextScene() {
    return new GameOverScene(this.bg, this.player, this.stairs);
  }
}

export { PlayScene }