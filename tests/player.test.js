import { Player } from "../src/modules/player";

test("Create Player instance with wrong type", () => {
  expect(() => new Player("alien")).toThrow("Invalid player type");
});

test("Create correct Player instance", () => {
  const player = new Player("computer");
  expect(player.type).toBe("computer");
});

test("Player instances contain their own gameboard", () => {
  const player = new Player();

  expect(player.gameboard.shipCounter).toBe(0);
});
