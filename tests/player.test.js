import { Player } from "../src/modules/player";

test("Create Player instance with wrong type", () => {
  expect(() => new Player("alien")).toThrow("Invalid player type");
});

test("Create correct Player instance", () => {
  const player = new Player("computer");
  expect(player.type).toBe("computer");
});
