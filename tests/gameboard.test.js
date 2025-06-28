import { Gameboard } from "../src/modules/gameboard";
import { Ship } from "../src/modules/ship";

test("Gameboard initialized with correct length", () => {
  const gameboard = new Gameboard();

  expect(gameboard.board.length).toBe(10);
});

test("Gameboard initialized with correct depth", () => {
  const gameboard = new Gameboard();

  for (let i = 0; i < 10; i++) {
    expect(gameboard.board[i].length).toBe(10);
  }
});

test("Place length 1 ship on square [0,0]", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(1);

  gameboard.placeShip(ship, 0, 0);

  expect(gameboard.board[0][0]).toBe("O");
});

test("Place length 1 ship on square [0,1]", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(1);

  gameboard.placeShip(ship, 0, 1);

  expect(gameboard.board[0][1]).toBe("O");
});

test("Place length 2 ship on square [0,0], expect it to be on [0,0] and [0,1]", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(2);

  gameboard.placeShip(ship, 0, 0);

  expect(gameboard.board[0][0]).toBe("O");
  expect(gameboard.board[0][1]).toBe("O");
});

test("Place length 4 ship on square [0,6], expect it to be on [0][6],[0][7],[0][8],[0][9]", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(4);

  gameboard.placeShip(ship, 0, 6);

  expect(gameboard.board[0][6]).toBe("O");
  expect(gameboard.board[0][7]).toBe("O");
  expect(gameboard.board[0][8]).toBe("O");
  expect(gameboard.board[0][9]).toBe("O");
});

test("Place length 4 ship on square [5,5], expect it to be on [5][5],[5][6],[5][7]", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  gameboard.placeShip(ship, 5, 5);

  expect(gameboard.board[5][5]).toBe("O");
  expect(gameboard.board[5][6]).toBe("O");
  expect(gameboard.board[5][7]).toBe("O");
});

test("Place length 1 ship out of boundaries", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(1);

  expect(gameboard.placeShip(ship, 10, 10)).toBe(
    "Ship placed out of boundaries, invalid placement",
  );
});

test("Place length 4 ship on square [5,8], partially out of boundaries", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(5);

  gameboard.placeShip(ship, 5, 8);

  expect(gameboard.board[5][8]).toBe(null);
  expect(gameboard.placeShip(ship, 5, 8)).toBe(
    "Ship ending out of boundaries, invalid placement",
  );
});

test("Place length 3 ship on square [0,0], with vertical orientation", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  gameboard.placeShip(ship, 0, 0, "vertical");

  expect(gameboard.board[0][0]).toBe("O");
  expect(gameboard.board[1][0]).toBe("O");
  expect(gameboard.board[2][0]).toBe("O");
});

test("Place length 4 ship on square [5,5] with vertical orientation, expect it to be on [5][5],[6][5],[7][5]", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  gameboard.placeShip(ship, 5, 5, "vertical");

  expect(gameboard.board[5][5]).toBe("O");
  expect(gameboard.board[6][5]).toBe("O");
  expect(gameboard.board[7][5]).toBe("O");
});

test("Place length 4 ship on square [5,8] vertically, partially out of boundaries", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(5);

  gameboard.placeShip(ship, 5, 8, "vertical");

  expect(gameboard.board[5][8]).toBe(null);
  expect(gameboard.placeShip(ship, 5, 8)).toBe(
    "Ship ending out of boundaries, invalid placement",
  );
});
