import {
  createStartBtn,
  declareWinner,
  generateEnemyBoard,
  generatePlayerBoard,
  renderSampleShips,
} from "./domUtils";
import { Player } from "./player";
import { Ship } from "./ship";

export class Game {
  constructor() {
    this.player1 = new Player();
    this.player2 = new Player("computer");
    this.ships = {
      submarine: {
        length: 1,
        amount: 4,
      },
      destroyer: {
        length: 2,
        amount: 3,
      },
      battleship: {
        length: 3,
        amount: 2,
      },
      carrier: {
        length: 4,
        amount: 1,
      },
    };
    this.guessBoard = [];
    this.#computerAttackBoard();
  }

  randomPlacement(player) {
    for (let ship in this.ships) {
      const shipData = this.ships[ship];

      for (let i = 0; i < shipData.amount; i++) {
        const newShip = new Ship(shipData.length);
        const orientation = ["horizontal", "vertical"];
        const zeroOrOne = Math.round(Math.random());
        const y = Math.floor(Math.random() * 10);
        const x = Math.floor(Math.random() * 10);

        const errorLog = player.gameboard.placeShip(
          newShip,
          y,
          x,
          orientation[zeroOrOne],
        );

        if (errorLog) {
          i--;
        }
      }
    }
  }

  placementPhase() {
    generatePlayerBoard(this.player1);
    renderSampleShips();
  }

  registerAttack(coordinateY, coordinateX) {
    this.player2.gameboard.receiveAttack(coordinateY, coordinateX);

    generateEnemyBoard(this.player2);

    if (this.#isGameFinished()) {
      if (this.player1.gameboard.shipCounter === 0) {
        declareWinner(this.player2.type);
        return;
      }

      declareWinner(this.player1.type);
      return;
    }

    this.#randomAttack();
    generatePlayerBoard(this.player1);

    if (this.#isGameFinished()) {
      if (this.player1.gameboard.shipCounter === 0) {
        declareWinner(this.player2.type);
        return;
      }

      declareWinner(this.player1.type);
      return;
    }
  }

  #computerAttackBoard() {
    this.guessBoard = [];

    for (let j = 0; j < 10; j++) {
      for (let k = 0; k < 10; k++) {
        this.guessBoard.push([j, k]);
      }
    }
  }

  #randomAttack() {
    const randomGuess = Math.floor(Math.random() * this.guessBoard.length);
    const guess = this.guessBoard[randomGuess];
    this.guessBoard.splice(randomGuess, 1);

    this.player1.gameboard.receiveAttack(guess[0], guess[1]);
  }

  #isGameFinished() {
    if (
      this.player1.gameboard.shipCounter === 0 ||
      this.player2.gameboard.shipCounter === 0
    ) {
      return true;
    }
    return false;
  }

  registerPlacement(selector, coordinateY, coordinateX) {
    const shipType = this.ships[selector];

    if (shipType.amount === 0) {
      return "No, more ships of this type";
    }

    const l = shipType.length;
    const ship = new Ship(l);

    const errorLog = this.player1.gameboard.placeShip(
      ship,
      coordinateY,
      coordinateX,
    );

    if (errorLog) {
      return errorLog;
    }

    shipType.amount--;
    generatePlayerBoard(this.player1);

    for (let ship in this.ships) {
      const shipData = this.ships[ship];

      if (shipData.amount !== 0) {
        return;
      }
    }
    createStartBtn();
  }
}
