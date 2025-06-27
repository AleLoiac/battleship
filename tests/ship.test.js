import { Ship } from "../src/modules/ship";

test("Ship instance with length equal to 3", () => {
  const ship = new Ship(3);
  expect(ship.length).toBe(3);
});

test("Ship instance with length equal to 5", () => {
  const ship = new Ship(5);
  expect(ship.length).toBe(5);
});

test("Ship instance with hit counter equal to 0", () => {
  const ship = new Ship(3);
  expect(ship.hit).toBe(0);
});

test("Ship instance with hit counter equal to 0", () => {
  const ship = new Ship(5);
  expect(ship.hit).toBe(0);
});

test("Ship instance isSunk property equal to false", () => {
  const ship = new Ship(3);
  expect(ship.isSunk).toBe(false);
});

test("Ship instance isSunk property equal to false", () => {
  const ship = new Ship(5);
  expect(ship.isSunk).toBe(false);
});
