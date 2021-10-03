import { io } from "socket.io-client";
import { generateColour } from "./lib/generateColour";
import { IPlayer } from "./types";

const socket = io("http://localhost:4040");

const newPlayer = (color: number) => {
  socket.emit("addNewPlayer", color);
};

const getAllPlayers = () => {
  socket.emit("getAllPlayers");
};

const updatePlayer = (player: IPlayer) => {
  socket.emit("updatePlayer", player);
};

const getCurrentPlayers = () => {
  socket.emit("getCurrentPlayers");
};

const Client = {
  socket,
  newPlayer,
  getAllPlayers,
  updatePlayer,
  getCurrentPlayers,
};

export default Client;
