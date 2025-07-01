import { generateEnemyBoard, generatePlayerBoard } from "./domUtils";
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
  }

  initialPlacement() {
    const playerSubmarine1 = new Ship(1);
    const playerSubmarine2 = new Ship(1);
    const playerSubmarine3 = new Ship(1);
    const playerSubmarine4 = new Ship(1);
    const playerDestroyer1 = new Ship(2);
    const playerDestroyer2 = new Ship(2);
    const playerDestroyer3 = new Ship(2);
    const playerBattleship1 = new Ship(3);
    const playerBattleship2 = new Ship(3);
    const playerCarrier1 = new Ship(4);

    const enemySubmarine1 = new Ship(1);
    const enemySubmarine2 = new Ship(1);
    const enemySubmarine3 = new Ship(1);
    const enemySubmarine4 = new Ship(1);
    const enemyDestroyer1 = new Ship(2);
    const enemyDestroyer2 = new Ship(2);
    const enemyDestroyer3 = new Ship(2);
    const enemyBattleship1 = new Ship(3);
    const enemyBattleship2 = new Ship(3);
    const enemyCarrier1 = new Ship(4);

    this.player1.gameboard.placeShip(playerSubmarine1, 0, 0);
    this.player1.gameboard.placeShip(playerSubmarine2, 2, 1);
    this.player1.gameboard.placeShip(playerSubmarine3, 4, 3);
    this.player1.gameboard.placeShip(playerSubmarine4, 5, 2);
    this.player1.gameboard.placeShip(playerDestroyer1, 0, 2, "vertical");
    this.player1.gameboard.placeShip(playerDestroyer2, 2, 5, "vertical");
    this.player1.gameboard.placeShip(playerDestroyer3, 5, 7);
    this.player1.gameboard.placeShip(playerBattleship1, 7, 0);
    this.player1.gameboard.placeShip(playerBattleship2, 9, 1);
    this.player1.gameboard.placeShip(playerCarrier1, 6, 5, "vertical");

    this.player2.gameboard.placeShip(enemySubmarine1, 1, 1);
    this.player2.gameboard.placeShip(enemySubmarine2, 3, 2);
    this.player2.gameboard.placeShip(enemySubmarine3, 5, 3);
    this.player2.gameboard.placeShip(enemySubmarine4, 7, 4);
    this.player2.gameboard.placeShip(enemyDestroyer1, 0, 6, "vertical");
    this.player2.gameboard.placeShip(enemyDestroyer2, 2, 8, "vertical");
    this.player2.gameboard.placeShip(enemyDestroyer3, 6, 7);
    this.player2.gameboard.placeShip(enemyBattleship1, 8, 0);
    this.player2.gameboard.placeShip(enemyBattleship2, 9, 3);
    this.player2.gameboard.placeShip(enemyCarrier1, 0, 3, "vertical");
  }

  start() {
    this.initialPlacement();
    generatePlayerBoard(this.player1);
    generateEnemyBoard(this.player2);
  }

  registerAttack(coordinateY, coordinateX) {
    this.player2.gameboard.receiveAttack(coordinateY, coordinateX);

    generateEnemyBoard(this.player2);
  }

  isFinished() {
    if (
      this.player1.gameboard.shipCounter === 0 ||
      this.player2.gameboard.shipCounter === 0
    ) {
      return true;
    }
    return false;
  }
}
