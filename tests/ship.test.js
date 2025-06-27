import { Ship } from "../src/modules/ship";

test("Ship instance with length equal to 3", () => {
  const ship = new Ship(3);
  expect(ship.length).toBe(3);
});

test("Ship instance with length equal to 5", () => {
  const ship = new Ship(5);
  expect(ship.length).toBe(5);
});

test("New Ship with length 3 has 0 hits", () => {
  const ship = new Ship(3);
  expect(ship.hitCounter).toBe(0);
});

test("New Ship with length 5 has 0 hits", () => {
  const ship = new Ship(5);
  expect(ship.hitCounter).toBe(0);
});

test("Ship instance with length 3 sunk property equal to false", () => {
  const ship = new Ship(3);
  expect(ship.sunk).toBe(false);
});

test("Ship instance with length 5 sunk property equal to false", () => {
  const ship = new Ship(5);
  expect(ship.sunk).toBe(false);
});

test("Hit a length 3 ship to increase hits by 1", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.hitCounter).toBe(1);
});

test("Hit a length 5 ship to increase hits by 1", () => {
  const ship = new Ship(5);
  ship.hit();
  expect(ship.hitCounter).toBe(1);
});

describe("Increasing hits to reach edge case", () => {
  let ship;

  beforeAll(() => {
    ship = new Ship(3);
  });

  test("Hit ship to increase hits by 2", () => {
    ship.hit();
    ship.hit();
    expect(ship.hitCounter).toBe(2);
  });

  test("Hit ship to exceed length", () => {
    ship.hit();
    ship.hit();
    expect(ship.hitCounter).toBe(3);
  });
});

describe("Ship sinks when hitCounter equals length", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  test("sunk is false after 1 hit", () => {
    ship.hit();
    expect(ship.sunk).toBe(false);
  });

  test("sunk is false after 2 hits", () => {
    ship.hit();
    ship.hit();
    expect(ship.sunk).toBe(false);
  });

  test("sunk is true after 3 hits", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.sunk).toBe(true);
  });
});
