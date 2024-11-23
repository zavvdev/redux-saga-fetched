import { test, expect } from "vitest";
import { Timestamp } from "../../entities/Timestamp.js";

test("should create Timestamp", () => {
  var createTimestamp = () => 123;
  expect(Timestamp.from(createTimestamp)).toStrictEqual(
    createTimestamp(),
  );
});

test("should throw an error if createTimestamp function returns a non-numeric value", () => {
  var createTimestamp = () => "123";
  expect(() => {
    Timestamp.from(createTimestamp);
  }).toThrow("Expected a number");
});

test("should throw an error if createTimestamp function returns a negative number", () => {
  var createTimestamp = () => -123;
  expect(() => {
    Timestamp.from(createTimestamp);
  }).toThrow("Expected a positive number");
});
