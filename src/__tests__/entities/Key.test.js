import { test, expect } from "vitest";
import { Key } from "../../entities/Key";

test("should throw an error if argument is not an array", () => {
  expect(() => {
    Key.from("123");
  }).toThrowError("Expected an array");
});

test("should throw an error if array has unsupported types", () => {
  expect(() => {
    Key.from([1, "2", {}, [1, 2, 3]]);
  }).toThrowError(
    "Expected an array of string, number, bigint, boolean",
  );
});

test("should return a string composed of valid parts", () => {
  expect(Key.from(["1", 2, 3n, true])).toBe("1_2_3_true");
  expect(Key.from(["1", 2, 3n, false, null, undefined])).toBe(
    "1_2_3_false",
  );
});
