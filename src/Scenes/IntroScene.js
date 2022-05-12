import { PlayScene } from "./PlayScene";
import { Scene } from "./Scene";

class IntroScene extends Scene {
  constructor(bg, player, stairs) {
    super(1);
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
    console.log('intro');
    console.log(mouseX, mouseY);
  }

  nextScene() {
    return new PlayScene(this.bg, this.player, this.stairs);
  }
}

export { IntroScene }