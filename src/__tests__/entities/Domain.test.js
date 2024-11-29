import { test, expect } from "vitest";
import { Domain } from "../../entities/Domain.js";

test("should create Domain", () => {
  expect(Domain.from("api")).toStrictEqual("api");
});

test("should throw an error if value is not a string", () => {
  expect(() => {
    Domain.from(123);
  }).toThrow("Expected a string");
});
