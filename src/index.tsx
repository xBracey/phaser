import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game",
};

class GameScene extends Phaser.Scene {
  private circle: Phaser.GameObjects.Arc;
  private direction: string;

  constructor() {
    super(sceneConfig);
    this.direction = "right";
  }

  public create() {
    this.circle = this.add.circle(0, 100, 80, 0xffffff);
  }

  public update() {
    this.circle.x += this.direction === "right" ? 10 : -10;

    if (this.circle.x > 300) {
      this.direction = "left";
    }

    if (this.circle.x < 100) {
      this.direction = "right";
    }
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 450,
  height: 600,
  backgroundColor: "#106100",
  scene: GameScene,
};

const game = new Phaser.Game(config);

ReactDOM.render(<App />, document.getElementById("root"));
