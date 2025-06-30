import { generateBoard } from "./modules/domUtils";
import { Player } from "./modules/player";
import { Ship } from "./modules/ship";
import "./css/styles.css";
import "./css/modern-normalize.css";

const player1 = new Player();
const player2 = new Player("computer");

const ship1 = new Ship(2);
const ship2 = new Ship(1);
const ship3 = new Ship(5);
const ship4 = new Ship(2);

const ship5 = new Ship(2);
const ship6 = new Ship(1);
const ship7 = new Ship(5);
const ship8 = new Ship(2);

player1.gameboard.placeShip(ship1, 8, 0, "vertical");
player1.gameboard.placeShip(ship2, 1, 3);
player1.gameboard.placeShip(ship3, 4, 4);
player1.gameboard.placeShip(ship4, 8, 6, "vertical");

player2.gameboard.placeShip(ship5, 1, 0, "vertical");
player2.gameboard.placeShip(ship6, 0, 3);
player2.gameboard.placeShip(ship7, 3, 2);
player2.gameboard.placeShip(ship8, 7, 6, "vertical");

generateBoard(player1);
generateBoard(player2);
