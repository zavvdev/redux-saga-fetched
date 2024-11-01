import { describe, test, expect } from "vitest";
import { createActionPatterns } from "../helpers.js";

describe("createActionPatterns", () => {
  test("should return an object with action patterns", () => {
    var instanceId = "123";
    var domain = "test";
    var patterns = createActionPatterns(() => instanceId)(domain);

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
