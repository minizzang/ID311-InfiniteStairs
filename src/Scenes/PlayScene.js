import { GameOverScene } from "./GameOverScene";
import { Scene } from "./Scene";

class PlayScene extends Scene {
  constructor(bg, player, stairs, buttons) {
    super(1);
    this.nextSceneClass = new GameOverScene();
    this.bg = bg;
    this.player = player;
    this.stairs = stairs;
    this.buttons = buttons;
  }

  draw() {
    fill(255, 0, 0);
    rect(40, 50, 50, 60);

    this.bg.draw();
    this.player.draw();
    this.stairs.draw();
    this.buttons.draw();
  }
}

export { PlayScene }