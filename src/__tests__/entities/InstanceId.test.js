import { test, expect } from "vitest";
import { InstanceId } from "../../entities/InstanceId.js";

test("should create InstanceId", () => {
  var id = () => "123";
  expect(InstanceId.from(id)).toStrictEqual(id());
});

test("should throw an error if id creator function returns a non-string value", () => {
  var id = () => 123;
  expect(() => {
    InstanceId.from(id);
  }).toThrow("Expected a string");
});
