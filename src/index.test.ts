import { describe, it, expect } from "vitest";
import { isEven } from "./index";

describe("isEven", () => {
  it("should be even", () => {
    expect(isEven(2)).toBe(true);
  });

  it("should not be even", () => {
    expect(isEven(3)).toBe(false);
  });
});
