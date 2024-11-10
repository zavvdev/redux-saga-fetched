import { test, expect } from "vitest";
import { getSelector } from "../../modules/selector";

test("should return selector that selects data from state by key", () => {
  var state = {
    domain: {
      key: "value",
    },
  };

  var selector = getSelector("domain");

  expect(selector(state, ["key"])).toBe("value");
});
