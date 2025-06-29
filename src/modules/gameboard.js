import { Ship } from "./ship";

export class Gameboard {
  constructor() {
    this.board = [];

    for (let i = 0; i < 10; i++) {
      this.board[i] = [];

      for (let j = 0; j < 10; j++) {
        this.board[i][j] = null;
      }
    }

    this.fleet = new Map();
    this.shipCounter = 0;
  }

  placeShip(ship, coordinateY, coordinateX, orientation = "horizontal") {
    if (
      coordinateX < 0 ||
      coordinateX > 9 ||
      coordinateY < 0 ||
      coordinateY > 9
    ) {
      return "Ship placed out of boundaries, invalid placement";
    }

    if (orientation === "vertical") {
      if (coordinateY + ship.length > 10) {
        return "Ship ending out of boundaries, invalid placement";
      }

      for (let i = coordinateY; i < ship.length + coordinateY; i++) {
        if (this.board[i][coordinateX] === "O") {
          return "Invalid ship position, at least 1 square occupied by another ship";
        }
      }

      for (let i = coordinateY; i < ship.length + coordinateY; i++) {
        this.board[i][coordinateX] = "O";
        this.fleet.set(this.#arrayToKey([i, coordinateX]), ship);
      }
      this.shipCounter++;
    } else {
      if (coordinateX + ship.length > 10) {
        return "Ship ending out of boundaries, invalid placement";
      }

      for (let i = coordinateX; i < ship.length + coordinateX; i++) {
        if (this.board[coordinateY][i] === "O") {
          return "Invalid ship position, at least 1 square occupied by another ship";
        }
      }

      for (let i = coordinateX; i < ship.length + coordinateX; i++) {
        this.board[coordinateY][i] = "O";
        this.fleet.set(this.#arrayToKey([coordinateY, i]), ship);
      }
      this.shipCounter++;
    }
  }

  receiveAttack(coordinateY, coordinateX) {
    if (
      coordinateX < 0 ||
      coordinateX > 9 ||
      coordinateY < 0 ||
      coordinateY > 9
    ) {
      return "Attack out of bounds, invalid attack";
    }

    if (
      this.board[coordinateY][coordinateX] === "X" ||
      this.board[coordinateY][coordinateX] === "@"
    ) {
      return "Invalid attack, cell already attacked";
    } else if (this.board[coordinateY][coordinateX] === "O") {
      this.board[coordinateY][coordinateX] = "@";

      const damagedShip = this.fleet.get(
        this.#arrayToKey([[coordinateY], [coordinateX]]),
      );

      damagedShip.hit();

      if (damagedShip.sunk === true) {
        this.shipCounter--;

        if (this.shipCounter === 0) {
          return "All ship sunk";
        }
      }
    } else {
      this.board[coordinateY][coordinateX] = "X";
    }
  }

  #arrayToKey([x, y]) {
    return `${x},${y}`;
  }
}
