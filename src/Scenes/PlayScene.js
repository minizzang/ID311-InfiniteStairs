import { GameOverScene } from "./GameOverScene";
import { Scene } from "./Scene";

import { ButtonDisplay } from '../Button';
import { ScoreDisplay } from '../ScoreDisplay.js'

import { GAME_WIDTH, GAME_HEIGHT, BTN_SIZE } from '../Constants';


class PlayScene extends Scene {
  constructor(bg, player, stairs) {
    super(2);
    this.bg = bg;
    this.stairs = stairs;
    this.player = player;
    this.score = new ScoreDisplay();
    this.buttons = new ButtonDisplay(GAME_WIDTH, GAME_HEIGHT*0.9, BTN_SIZE);

    this.subscribeSubjects();
  }

  draw() {
    this.bg.draw();
    this.stairs.draw();
    this.player.draw();
    if (this.player.getGameState() != 'end'){
      this.buttons.draw();
      this.score.draw();
    }
  }

  mousePressed() {
    console.log('play');
    console.log('change to gameOver');
    this.nextScene();
  }
  
  keyPressed() {
    switch (key) {
      case 'ArrowLeft':
        // player change direction
        this.player.changeDirection();
        this.buttons.clickEffect(1);
        break;
      case 'ArrowRight':
        // player go upstair
        this.player.goUpStairs();
        this.buttons.clickEffect(2);
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
    return new GameOverScene(this.bg, this.player, this.stairs, this.score.getScore());
  }
}

export { PlayScene }