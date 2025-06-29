import { Gameboard } from "../src/modules/gameboard";
import { Ship } from "../src/modules/ship";

let gameboard;

beforeEach(() => {
  return (gameboard = new Gameboard());
});

test("Gameboard initialized with correct length", () => {
  expect(gameboard.board.length).toBe(10);
});

test("Gameboard initialized with correct depth", () => {
  for (let i = 0; i < 10; i++) {
    expect(gameboard.board[i].length).toBe(10);
  }
});

test("Place length 1 ship on square [0,0]", () => {
  const ship = new Ship(1);

  gameboard.placeShip(ship, 0, 0);

  expect(gameboard.board[0][0]).toBe("O");
});

test("Place length 1 ship on square [0,1]", () => {
  const ship = new Ship(1);

  gameboard.placeShip(ship, 0, 1);

  expect(gameboard.board[0][1]).toBe("O");
});

test("Place length 2 ship on square [0,0], expect it to be on [0,0] and [0,1]", () => {
  const ship = new Ship(2);

  gameboard.placeShip(ship, 0, 0);

  expect(gameboard.board[0][0]).toBe("O");
  expect(gameboard.board[0][1]).toBe("O");
});

test("Place length 4 ship on square [0,6], expect it to be on [0][6],[0][7],[0][8],[0][9]", () => {
  const ship = new Ship(4);

  gameboard.placeShip(ship, 0, 6);

  expect(gameboard.board[0][6]).toBe("O");
  expect(gameboard.board[0][7]).toBe("O");
  expect(gameboard.board[0][8]).toBe("O");
  expect(gameboard.board[0][9]).toBe("O");
});

test("Place length 3 ship on square [5,5], expect it to be on [5][5],[5][6],[5][7]", () => {
  const ship = new Ship(3);

  gameboard.placeShip(ship, 5, 5);

  expect(gameboard.board[5][5]).toBe("O");
  expect(gameboard.board[5][6]).toBe("O");
  expect(gameboard.board[5][7]).toBe("O");
});

test("Place length 1 ship out of boundaries", () => {
  const ship = new Ship(1);

  expect(gameboard.placeShip(ship, 10, 10)).toBe(
    "Ship placed out of boundaries, invalid placement",
  );
});

test("Place length 5 ship on square [5,8], partially out of boundaries", () => {
  const ship = new Ship(5);

  expect(gameboard.placeShip(ship, 5, 8)).toBe(
    "Ship ending out of boundaries, invalid placement",
  );
  expect(gameboard.board[5][8]).toBe(null);
});

test("Place length 3 ship on square [0,0], with vertical orientation", () => {
  const ship = new Ship(3);

  gameboard.placeShip(ship, 0, 0, "vertical");

  expect(gameboard.board[0][0]).toBe("O");
  expect(gameboard.board[1][0]).toBe("O");
  expect(gameboard.board[2][0]).toBe("O");
});

test("Place length 3 ship on square [5,5] with vertical orientation, expect it to be on [5][5],[6][5],[7][5]", () => {
  const ship = new Ship(3);

  gameboard.placeShip(ship, 5, 5, "vertical");

  expect(gameboard.board[5][5]).toBe("O");
  expect(gameboard.board[6][5]).toBe("O");
  expect(gameboard.board[7][5]).toBe("O");
});

test("Place length 5 ship on square [5,8] vertically, partially out of boundaries", () => {
  const ship = new Ship(5);

  expect(gameboard.placeShip(ship, 6, 8)).toBe(
    "Ship ending out of boundaries, invalid placement",
  );
  expect(gameboard.board[6][8]).toBe(null);
});

test("Length 1 ship placed over another length 1 ship", () => {
  const ship1 = new Ship(1);
  const ship2 = new Ship(1);

  gameboard.placeShip(ship1, 0, 0);
  expect(gameboard.placeShip(ship2, 0, 0)).toBe(
    "Invalid ship position, at least 1 square occupied by another ship",
  );
});

test("Length 5 ship crossing a length 3 ship", () => {
  const ship1 = new Ship(3);
  const ship2 = new Ship(5);

  gameboard.placeShip(ship1, 3, 5);
  expect(gameboard.placeShip(ship2, 2, 6, "vertical")).toBe(
    "Invalid ship position, at least 1 square occupied by another ship",
  );
});

test("Receive attack on [7,7] coordinates", () => {
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(7, 7);

  expect(gameboard.board[0][0]).toBe("X");
  expect(gameboard.board[7][7]).toBe("X");
});

test("Receive attack out of bounds", () => {
  expect(gameboard.receiveAttack(10, 10)).toBe(
    "Attack out of bounds, invalid attack",
  );
});

test("Receive attack on ship, mark ship section", () => {
  const ship = new Ship(3);

  gameboard.placeShip(ship, 6, 7, "vertical");
  gameboard.receiveAttack(7, 7);

  expect(gameboard.board[6][7]).toBe("O");
  expect(gameboard.board[7][7]).toBe("@");
  expect(gameboard.board[8][7]).toBe("O");
});

test("Attack cell that was attacked before", () => {
  gameboard.receiveAttack(0, 0);

  expect(gameboard.receiveAttack(0, 0)).toBe(
    "Invalid attack, cell already attacked",
  );
});

test("Attack ship cell that was attacked before", () => {
  const ship = new Ship(3);

  gameboard.placeShip(ship, 0, 0, "vertical");
  gameboard.receiveAttack(0, 0);

  expect(gameboard.receiveAttack(0, 0)).toBe(
    "Invalid attack, cell already attacked",
  );
});

test("Create ship instance and register it in the gameboard's Map", () => {
  const ship = new Ship(2);

  gameboard.placeShip(ship, 0, 0);
  expect(gameboard.fleet.get("0,0")).toEqual(ship);
  expect(gameboard.fleet.get("0,1")).toEqual(ship);
});

test("Ships life decreased by 1 after being attacked", () => {
  const ship = new Ship(2);

  gameboard.placeShip(ship, 0, 0);
  gameboard.receiveAttack(0, 0);

  expect(gameboard.fleet.get("0,0")).toEqual({
    length: 2,
    hitCounter: 1,
    sunk: false,
  });
});

test("Ship is sunk after being attacked 2 times", () => {
  const ship = new Ship(2);

  gameboard.placeShip(ship, 0, 0, "vertical");
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(1, 0);

  expect(gameboard.fleet.get("0,0")).toEqual({
    length: 2,
    hitCounter: 2,
    sunk: true,
  });
});
