export class Gameboard {
  constructor() {
    this.board = [];

    for (let i = 0; i < 10; i++) {
      this.board[i] = [];

      for (let j = 0; j < 10; j++) {
        this.board[i][j] = null;
      }
    }
  }

  placeShip(ship, coordinateX, coordinateY, orientation) {
    if (
      coordinateX < 0 ||
      coordinateX > 9 ||
      coordinateY < 0 ||
      coordinateY > 9
    ) {
      return "Ship placed out of boundaries, invalid placement";
    }

    if (orientation === "vertical") {
      if (coordinateY + ship.length > 9) {
        return "Ship ending out of boundaries, invalid placement";
      }

      for (let i = coordinateX; i < ship.length + coordinateX; i++) {
        this.board[i][coordinateY] = "O";
      }
    } else {
      if (coordinateX + ship.length > 9) {
        return "Ship ending out of boundaries, invalid placement";
      }

      for (let i = coordinateY; i < ship.length + coordinateY; i++) {
        this.board[coordinateX][i] = "O";
      }
    }
  }
}
