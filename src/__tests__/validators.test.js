import { describe, expect, test } from "vitest";
import { Either as E } from "utilities";
import {
  string,
  number,
  array,
  isNotNullish,
  arrayOf,
  positive,
  object,
} from "../validators";

describe("string", () => {
  test("should return Right", () => {
    expect(string("123")).toStrictEqual(E.right("123"));
  });

  test("should return Left", () => {
    expect(string(123)).toStrictEqual(E.left("Expected a string"));
    expect(string(null)).toStrictEqual(E.left("Expected a string"));
    expect(string(undefined)).toStrictEqual(
      E.left("Expected a string"),
    );
    expect(string(false)).toStrictEqual(E.left("Expected a string"));
    expect(string(["1", "2"])).toStrictEqual(
      E.left("Expected a string"),
    );
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
    expect(number(undefined)).toStrictEqual(
      E.left("Expected a number"),
    );
    expect(number(false)).toStrictEqual(E.left("Expected a number"));
    expect(number(["1", "2"])).toStrictEqual(
      E.left("Expected a number"),
    );
    expect(number({})).toStrictEqual(E.left("Expected a number"));
  });
});

describe("array", () => {
  test("should return Right", () => {
    expect(array([])).toStrictEqual(E.right([]));
  });

  test("should return Left", () => {
    expect(array("123")).toStrictEqual(E.left("Expected an array"));
    expect(array(123)).toStrictEqual(E.left("Expected an array"));
    expect(array(null)).toStrictEqual(E.left("Expected an array"));
    expect(array(undefined)).toStrictEqual(
      E.left("Expected an array"),
    );
    expect(array(false)).toStrictEqual(E.left("Expected an array"));
    expect(array({})).toStrictEqual(E.left("Expected an array"));
  });
});

describe("isNotNullish", () => {
  test("should return true", () => {
    expect(isNotNullish("123")).toBe(true);
    expect(isNotNullish(123)).toBe(true);
    expect(isNotNullish(false)).toBe(true);
    expect(isNotNullish(["1", "2"])).toBe(true);
    expect(isNotNullish({})).toBe(true);
  });

  test("should return false", () => {
    expect(isNotNullish(null)).toBe(false);
    expect(isNotNullish(undefined)).toBe(false);
  });
});

describe("arrayOf", () => {
  test("should return Right", () => {
    expect(arrayOf(["string"])(["1", "2"])).toStrictEqual(
      E.right(["1", "2"]),
    );

    expect(arrayOf(["string", "number"])(["1", 2])).toStrictEqual(
      E.right(["1", 2]),
    );
  });

  test("should return Left", () => {
    expect(arrayOf(["string"])([1, 2])).toStrictEqual(
      E.left("Expected an array of string"),
    );
    expect(
      arrayOf(["string", "number"])(["1", 2, false]),
    ).toStrictEqual(E.left("Expected an array of string, number"));
  });
});

describe("positive", () => {
  test("should return Right", () => {
    expect(positive(123)).toStrictEqual(E.right(123));
    expect(positive(0)).toStrictEqual(E.right(0));
  });

  test("should return Left", () => {
    expect(positive(-1)).toStrictEqual(
      E.left("Expected a positive number"),
    );
  });
});

describe("object", () => {
  test("should return Right", () => {
    expect(object({})).toStrictEqual(E.right({}));
  });

  test("should return Left", () => {
    expect(object("123")).toStrictEqual(E.left("Expected an object"));
    expect(object(123)).toStrictEqual(E.left("Expected an object"));
    expect(object(null)).toStrictEqual(E.left("Expected an object"));
    expect(object(undefined)).toStrictEqual(
      E.left("Expected an object"),
    );
    expect(object(false)).toStrictEqual(E.left("Expected an object"));
    expect(object(["1", "2"])).toStrictEqual(
      E.left("Expected an object"),
    );
  });
});
