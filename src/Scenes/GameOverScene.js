import { PlayScene } from "./PlayScene";
import { Scene } from "./Scene";

import { Player } from '../Player';
import { Stairs } from '../Stairs';

import { GAME_WIDTH, GAME_HEIGHT, STEP_NUM } from '../Constants';

class GameOverScene extends Scene {
  constructor(bg, player, stairs) {
    super(3);
    this.bg = bg;
    this.player = player;
    this.stairs = stairs;
  }

  draw() {
    this.bg.draw();
    this.stairs.draw();
    this.player.draw();
  }

  mousePressed() {
    console.log('gameOver');
    console.log('change to play');
    // this.nextScene();
  }

  nextScene(player, stairs) {
    return new PlayScene(this.bg, player, stairs);
  }
}

export { GameOverScene }