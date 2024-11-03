import { describe, test, expect } from "vitest";
import {
  createActionType,
  createActionTypePatterns,
} from "../helpers.js";

describe("createActionTypePatterns", () => {
  test("should return an object with action patterns", () => {
    var instanceId = "123";
    var domain = "test";
    var patterns = createActionTypePatterns(() => instanceId)(domain);

    expect(patterns).toEqual({
      query: {
        request: `query_request@${domain}#${instanceId}`,
        success: `query_success@${domain}#${instanceId}`,
        failure: `query_failure@${domain}#${instanceId}`,
        invalidate: `query_invalidate@${domain}#${instanceId}`,
      },
      mutation: {
        request: `mutation_request@${domain}#${instanceId}`,
        success: `mutation_success@${domain}#${instanceId}`,
        failure: `mutation_failure@${domain}#${instanceId}`,
      },
    });
  });
});

describe("createActionType", () => {
  test("should return an action type string", () => {
    expect(createActionType("key")("request")).toBe("key@request");
  });
});
