import { describe, it, expect } from "vitest";
import { isEven, isNullish } from "./index";

describe("isEven", () => {
  it("should be even", () => {
    expect(isEven(2)).toBe(true);
  });

  it("should not be even", () => {
    expect(isEven(3)).toBe(false);
  });
});

describe("isNullish", () => {
  it("should be nullish", () => {
    expect(isNullish(null)).toBe(true);
  });

  it("should not be even", () => {
    expect(isNullish(false)).toBe(false);
  });
});
