import title from '../../assets/Images/objects/title.png';
import btnPlay from '../../assets/Images/buttons/btnPlay.png';

import { PlayScene } from "./PlayScene";
import { Scene } from "./Scene";

import { BTN_SIZE } from '../Constants';
import { PlayButton } from '../Button';

class IntroScene extends Scene {
  constructor(bg, player, stairs) {
    super(1);
    this.bg = bg;
    this.player = player;
    this.stairs = stairs;

    this.titleImg = loadImage(title);
    
    this.btnPlay = new PlayButton (width/2, height*0.9, BTN_SIZE, BTN_SIZE*0.8);
  }

  draw() {
    this.bg.draw();
    this.stairs.draw();
    this.player.draw();

    image(this.titleImg, width/2, 140, width*0.8, this.titleImg.height/this.titleImg.width * width*0.8);
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

  nextScene() {
    return new PlayScene(this.bg, this.player, this.stairs);
  }
}

export { IntroScene }