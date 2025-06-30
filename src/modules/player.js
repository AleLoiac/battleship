import { Gameboard } from "./gameboard";

export class Player {
  constructor(type = "human") {
    if (type !== "human" && type !== "computer") {
      throw new Error("Invalid player type");
    }

    this.type = type;
    this.gameboard = new Gameboard();
  }
}
