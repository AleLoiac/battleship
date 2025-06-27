import { Gameboard } from "../src/modules/gameboard";

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
