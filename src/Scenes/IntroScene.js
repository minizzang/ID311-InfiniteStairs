import { PlayScene } from "./PlayScene";
import { Scene } from "./Scene";

import {p5} from 'p5js-wrapper';

// import title from '../assets/Images/objects/title.png';

class IntroScene extends Scene {
  constructor(bg, player, stairs) {
    super(1);
    this.bg = bg;
    this.player = player;
    this.stairs = stairs;
    this.nextSceneClass = new PlayScene(this.bg, this.player, this.stairs);
  }

  draw() {
    this.bg.draw();
    this.stairs.draw();
    this.player.draw();
  }
}

export { IntroScene }