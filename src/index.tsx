import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import Client from "./client";
import "./index.css";
import { generateColour } from "./lib/generateColour";
import { IPlayer } from "./types";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game",
};

class GameScene extends Phaser.Scene {
  private circle: Phaser.GameObjects.Arc;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private id: string;
  private color: number;
  private otherPlayers: {
    [id: string]: Phaser.GameObjects.Arc;
  };

  constructor() {
    super(sceneConfig);
    this.newPlayer();
    this.updateAllPlayers();
    this.sendId();
    this.removePlayer();
    this.color = generateColour();

    Client.newPlayer(this.color);
  }

  public create() {
    this.circle = this.add.circle(0, 0, 80, this.color);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.otherPlayers = {};
    Client.getCurrentPlayers();
  }

  public newPlayer() {
    Client.socket.on("newPlayer", (player: IPlayer) => {
      if (player.id !== this.id && !this.otherPlayers[player.id]) {
        this.otherPlayers[player.id] = this.add.circle(
          player.x,
          player.y,
          80,
          player.color
        );
      }
    });
  }

  public removePlayer() {
    Client.socket.on("removePlayer", (id: string) => {
      this.otherPlayers[id].destroy();
      delete this.otherPlayers[id];
    });
  }

  public sendId() {
    Client.socket.on("sendId", (id) => {
      this.id = id;
    });
  }

  public updateAllPlayers() {
    Client.socket.on(
      "allPlayers",
      (players: { [playerId: string]: IPlayer }) => {
        Object.values(players)
          .filter(
            (player) => this.otherPlayers[player.id] && player.id !== this.id
          )
          .map((player) => {
            this.otherPlayers[player.id].x = player.x;
            this.otherPlayers[player.id].y = player.y;
          });
      }
    );
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

    Client.updatePlayer({
      x: this.circle.x,
      y: this.circle.y,
      id: this.id,
      color: this.color,
    });
    Client.getAllPlayers();
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 500,
  height: 500,
  backgroundColor: "#106100",
  scene: GameScene,
};

const game = new Phaser.Game(config);

ReactDOM.render(<App />, document.getElementById("root"));
