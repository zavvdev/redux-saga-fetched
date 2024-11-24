import { describe, test, expect } from "vitest";
import {
  createAction,
  createActionType,
  createActionTypePatterns,
  selectData,
  selectIsInProgress,
  selectKeyState,
  selectMatchedKeys,
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

describe("selectIsInProgress", () => {
  test("should return true if isLoading is true", () => {
    var state = {
      domain: {
        key: {
          isLoading: true,
        },
      },
    };

    expect(selectIsInProgress("domain", "key")(state)).toBe(true);
  });

  test("should return true if isFetching is true", () => {
    var state = {
      domain: {
        key: {
          isFetching: true,
        },
      },
    };

    expect(selectIsInProgress("domain", "key")(state)).toBe(true);
  });

  test("should return false if isFetching and isLoading is false", () => {
    var state = {
      domain: {
        key: {
          isFetching: false,
          isLoading: false,
        },
      },
    };

    expect(selectIsInProgress("domain", "key")(state)).toBe(false);
  });

  test("should return false if isFetching and isLoading is missing", () => {
    var state = {
      domain: {
        key: {},
      },
    };

    expect(selectIsInProgress("domain", "key")(state)).toBe(false);
  });
});

describe("selectKeyState", () => {
  test("should return an empty object if key is missing", () => {
    var state = {
      domain: {},
    };

    expect(selectKeyState("domain", "key")(state)).toEqual({});
  });

  test("should return key state", () => {
    var state = {
      domain: {
        key: {
          data: "data",
        },
      },
    };

    expect(selectKeyState("domain", "key")(state)).toEqual({
      data: "data",
    });
  });
});

describe("selectMatchedKeys", () => {
  test("should return an empty array", () => {
    var state = {
      domain: {},
    };

    expect(selectMatchedKeys("key", "domain")(state)).toEqual([]);
  });

  test("should return exactly matched key", () => {
    var state = {
      domain: {
        key: {},
      },
    };

    expect(selectMatchedKeys("key", "domain")(state)).toEqual([
      "key",
    ]);
  });

  test("should return partially matched key", () => {
    var state = {
      domain: {
        key1: {},
        key2: {},
      },
    };

    expect(selectMatchedKeys("key", "domain")(state)).toEqual([
      "key1",
      "key2",
    ]);
  });
});
