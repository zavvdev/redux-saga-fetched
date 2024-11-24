import { describe, test, expect } from "vitest";
import {
  createAction,
  createActionType,
  createActionTypePatterns,
  selectData,
} from "../../modules/_helpers.js";

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
        reset: `query_reset@${domain}#${instanceId}`,
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

describe("createAction", () => {
  test("should return an action object", () => {
    var action = createAction("key")({
      type: "type",
      data: "data",
      timestamp: "timestamp",
      error: "error",
    });

    expect(action).toEqual({
      type: "type",
      payload: {
        key: "key",
        data: "data",
        timestamp: "timestamp",
        error: "error",
      },
    });
  });
});

describe("selectData", () => {
  test("should select data by key", () => {
    var state = {
      domain: {
        key: {
          data: "data",
        },
      },
    };

    expect(selectData("domain", "key")(state)).toEqual("data");
  });

  test("should return null if data is missing", () => {
    var state = {
      domain: {},
    };

    expect(selectData("domain", "key")(state)).toEqual(null);
  });
});
