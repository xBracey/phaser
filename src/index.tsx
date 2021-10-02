import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./index.css";

enum Direction {
  None,
  Left,
  Down,
  Right,
  Up,
}

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game",
};

class GameScene extends Phaser.Scene {
  private circle: Phaser.GameObjects.Arc;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private direction: Direction;
  private acceleration: number[][];

  constructor() {
    super(sceneConfig);
  }

  public create() {
    this.circle = this.add.circle(100, 100, 80, 0xffffff);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.direction = Direction.None;
    this.acceleration = Array(10).fill(Array(10).fill(0));
  }

  public update() {
    const { left, down, right, up } = this.cursors;

    if (left.isDown) {
      this.circle.x -= 3;
    }
    if (down.isDown) {
      this.circle.y += 3;
    }
    if (up.isDown) {
      this.circle.y -= 3;
    }
    if (right.isDown) {
      this.circle.x += 3;
    }

    if ([left, down, right, up].every((dir) => !dir.isDown)) {
      this.direction = Direction.None;
    }
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: "100vw",
  height: "100vh",
  backgroundColor: "#106100",
  scene: GameScene,
};

const game = new Phaser.Game(config);

ReactDOM.render(<App />, document.getElementById("root"));
