import { PlayScene } from "./PlayScene";
import { Scene } from "./Scene";

class GameOverScene extends Scene {
  constructor() {
    super(1);
    this.nextSceneClass = PlayScene;
  }

  draw() {
    fill(255, 0, 0);
    rect(40, 50, 50, 60);
  }
}

export { GameOverScene }