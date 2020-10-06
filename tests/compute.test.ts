import { compute } from "../src/compute";
import { Game } from "../src/types";

it("should return 300 on a perfect game", () => {
  const input300: Game = [
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 10, 10],
  ];

  const score = compute(input300);

  expect(score).toBe(300);
});

it("should return 125", () => {
  const input125: Game = [
    [3, 6],
    [5, 5],
    [4, 6],
    [10, 0],
    [8, 2],
    [4, 6],
    [3, 5],
    [3, 7],
    [5, 1],
    [5, 1, 0],
  ];

  const score = compute(input125);

  expect(score).toBe(125);
});

it("should return 140", () => {
  const input140: Game = [
    [3, 7],
    [10, 0],
    [7, 3],
    [3, 5],
    [9, 0],
    [4, 6],
    [10, 0],
    [3, 2],
    [7, 3],
    [3, 7, 7],
  ];

  const score = compute(input140);

  expect(score).toBe(140);
});

it("should return 132", () => {
  const input132: Game = [
    [7, 3],
    [10, 0],
    [10, 0],
    [2, 5],
    [7, 2],
    [9, 1],
    [10, 0],
    [3, 2],
    [7, 3],
    [2, 3, 0],
  ];

  const score = compute(input132);

  expect(score).toBe(132);
});
