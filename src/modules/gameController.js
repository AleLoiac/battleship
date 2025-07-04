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

    this.fleetComposition = {
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
    this.player1Fleet = this.#createFleetState();
    this.player2Fleet = this.#createFleetState();
    this.guessBoard = [];
    this.#computerAttackBoard();
    this.computerNextAttacks = [];
  }

  randomPlacement(player, fleetState) {
    for (let ship in fleetState) {
      const shipData = fleetState[ship];

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

    this.#attack();
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

  #attack() {
    if (this.computerNextAttacks.length !== 0) {
      this.#focusedAttack();
    } else {
      this.#randomAttack();
    }
  }

  #randomAttack() {
    const randomGuess = Math.floor(Math.random() * this.guessBoard.length);
    const guess = this.guessBoard[randomGuess];
    this.guessBoard.splice(randomGuess, 1);

    if (this.player1.gameboard.board[guess[0]][guess[1]] === "O") {
      this.#scheduleNextAttacks(guess[0], guess[1]);
    }

    this.player1.gameboard.receiveAttack(guess[0], guess[1]);
  }

  #focusedAttack() {
    const [y, x] = this.computerNextAttacks[0];

    if (this.player1.gameboard.board[y][x] === "O") {
      this.#scheduleNextAttacks(y, x);
    }

    this.player1.gameboard.receiveAttack(y, x);

    const attack = this.computerNextAttacks.shift();

    this.guessBoard = this.guessBoard.filter(
      (coord) => coord[0] !== attack[0] || coord[1] !== attack[1],
    );
  }

  #scheduleNextAttacks(coordinateY, coordinateX) {
    const yCells = [1, -1, 0, 0];
    const xCells = [0, 0, 1, -1];

    for (let i = 0; i < 4; i++) {
      const newY = coordinateY + yCells[i];
      const newX = coordinateX + xCells[i];

      if (!this.#checkValidCell(newY) || !this.#checkValidCell(newX)) continue;

      const alreadyScheduled = this.computerNextAttacks.some(
        (coord) => coord[0] === newY && coord[1] === newX,
      );

      const stillGuessable = this.guessBoard.some(
        (coord) => coord[0] === newY && coord[1] === newX,
      );

      if (!alreadyScheduled && stillGuessable) {
        this.computerNextAttacks.push([newY, newX]);
      }
    }
  }

  #checkValidCell(value) {
    if (value < 0 || value > 9) {
      return false;
    }
    return true;
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

  #createFleetState() {
    const fleet = {};
    for (const type in this.fleetComposition) {
      const { length, amount } = this.fleetComposition[type];
      fleet[type] = { length, amount };
    }
    return fleet;
  }

  registerPlacement(selector, coordinateY, coordinateX, orientation) {
    const shipType = this.player1Fleet[selector];

    if (shipType.amount === 0) {
      return "No, more ships of this type";
    }

    const l = shipType.length;
    const ship = new Ship(l);

    const errorLog = this.player1.gameboard.placeShip(
      ship,
      coordinateY,
      coordinateX,
      orientation,
    );

    if (errorLog) {
      return errorLog;
    }

    shipType.amount--;
    generatePlayerBoard(this.player1);

    for (let ship in this.player1Fleet) {
      const shipData = this.player1Fleet[ship];

      if (shipData.amount !== 0) {
        return;
      }
    }
    createStartBtn(this);
  }

  startGame() {
    this.randomPlacement(this.player2, this.player2Fleet);
    generateEnemyBoard(this.player2);
  }
}
