import { describe, expect, test } from "vitest";
import { string, number } from "../validators";
import { Either as E } from "utilities";

describe("string", () => {
  test("should return Right", () => {
    expect(string("123")).toStrictEqual(E.right("123"));
  });

  test("should return Left", () => {
    expect(string(123)).toStrictEqual(E.left("Expected a string"));
    expect(string(null)).toStrictEqual(E.left("Expected a string"));
    expect(string(undefined)).toStrictEqual(E.left("Expected a string"));
    expect(string(false)).toStrictEqual(E.left("Expected a string"));
    expect(string(["1", "2"])).toStrictEqual(E.left("Expected a string"));
    expect(string({})).toStrictEqual(E.left("Expected a string"));
  });
});

describe("number", () => {
  test("should return Right", () => {
    expect(number(123)).toStrictEqual(E.right(123));
  });

  test("should return Left", () => {
    expect(number("123")).toStrictEqual(E.left("Expected a number"));
    expect(number(null)).toStrictEqual(E.left("Expected a number"));
    expect(number(undefined)).toStrictEqual(E.left("Expected a number"));
    expect(number(false)).toStrictEqual(E.left("Expected a number"));
    expect(number(["1", "2"])).toStrictEqual(E.left("Expected a number"));
    expect(number({})).toStrictEqual(E.left("Expected a number"));
  });
});
