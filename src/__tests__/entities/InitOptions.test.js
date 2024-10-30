import { describe, test } from "vitest";
import { InitOptions } from "../../entities/InitOptions";
import { expect } from "vitest";

describe("InitOptions", () => {
  test("should create InitOptions entity", () => {
    expect(
      InitOptions.from({
        domain: "api",
        staleTime: 1000,
      }),
    ).toStrictEqual(new InitOptions("api", 1000));
  });

  test("should throw error if domain is not a string", () => {
    expect(() => {
      InitOptions.from({
        domain: 1,
        staleTime: 1000,
      });
    }).toThrow("Expected a string");
  });

  test("should throw error if staleTime is not a number", () => {
    expect(() => {
      InitOptions.from({
        domain: "api",
        staleTime: "1000",
      });
    }).toThrow("Expected a number");
  });
});
