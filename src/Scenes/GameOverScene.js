import { PlayScene } from "./PlayScene";
import { Scene } from "./Scene";


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

    text("Game over", width/2, 40);
  }

  mousePressed() {
    console.log('gameOver');
    console.log('change to play');
  }

  nextScene(player, stairs) {
    return new PlayScene(this.bg, player, stairs);
  }
}

export { GameOverScene }