class Scene {
  constructor(sceneNum) {
    this.sceneNum = sceneNum;
    this.nextSceneClass = undefined;
  }

  draw() {

  }

  getSceneNum() {
    return this.sceneNum;
  }

  nextScene() {
    return this.nextSceneClass;
  }
}

export { Scene }