import { expect, test, describe } from "vitest";
import { runSaga } from "redux-saga";
import { InitOptions } from "../../entities/InitOptions";
import {
  getQuery,
  selectData,
  selectIsInProgress,
  selectIsValid,
} from "../../modules/query";
import {
  createAction,
  createActionType,
  createActionTypePatterns,
} from "../../modules/_helpers";

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

describe("selectIsValid", () => {
  test("should return false if timestamp is missing", () => {
    var state = {
      domain: {
        key: {},
      },
    };

    expect(
      selectIsValid("domain", "key", () => 123, 1000)(state),
    ).toBe(false);
  });

  test("should return false if timestamp is not a number", () => {
    var state = {
      domain: {
        key: {
          timestamp: "123",
        },
      },
    };

    expect(
      selectIsValid("domain", "key", () => 123, 1000)(state),
    ).toBe(false);
  });

  test("should return false if stale time has passed", () => {
    var state = {
      domain: {
        key: {
          timestamp: 100,
        },
      },
    };

    expect(selectIsValid("domain", "key", () => 125, 24)(state)).toBe(
      false,
    );
  });

  test("should return true if stale time has not passed", () => {
    var state = {
      domain: {
        key: {
          timestamp: 100,
        },
      },
    };

    expect(selectIsValid("domain", "key", () => 125, 26)(state)).toBe(
      true,
    );
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

    expect(selectData("domain", "key")(state)).toEqual({
      data: "data",
    });
  });

  test("should return null if data is missing", () => {
    var state = {
      domain: {},
    };

    expect(selectData("domain", "key")(state)).toEqual(null);
  });
});

describe("query", () => {
  var domain = "domain";
  var key = "key";

  var createTimestamp = () => 123;

  var action = createAction(key);

  var actionTypePatterns = createActionTypePatterns(() => 123)(
    domain,
  );

  var initOptions = InitOptions.from({
    staleTime: 1000,
    domain,
  });

  test("should return current state if in progress", () => {
    var query = getQuery({
      actionTypePatterns,
      initOptions,
      createTimestamp,
    });

    var result = runSaga(
      {
        dispatch: () => {},
        getState: () => ({
          [domain]: {
            [key]: {
              isLoading: true,
              data: "data",
            },
          },
        }),
      },
      query,
      {
        key: [key],
        fn: () => {},
      },
    );

    expect(result.result()).toEqual({
      isLoading: true,
      data: "data",
    });
  });

  test("should return current state if it's valid", () => {
    var query = getQuery({
      actionTypePatterns,
      initOptions,
      createTimestamp,
    });

    var result = runSaga(
      {
        dispatch: () => {},
        getState: () => ({
          [domain]: {
            [key]: {
              isLoading: false,
              timestamp: 100,
              data: "data",
            },
          },
        }),
      },
      query,
      {
        key: [key],
        fn: () => {},
        options: {
          staleTime: 24,
        },
      },
    );

    expect(result.result()).toEqual({
      isLoading: false,
      timestamp: 100,
      data: "data",
    });
  });

  test("should return new data", () => {
    var query = getQuery({
      actionTypePatterns,
      initOptions,
      createTimestamp,
    });

    var newData = "new data";

    var dispatches = [];

    var result = runSaga(
      {
        dispatch: (action) => dispatches.push(action),
        getState: () => ({
          [domain]: {
            [key]: {
              isLoading: false,
              timestamp: 100,
              data: "data",
            },
          },
        }),
      },
      query,
      {
        key: [key],
        fn: () => newData,
        options: {
          staleTime: 21,
        },
      },
    );

    expect(result.result()).toEqual(newData);

    expect(dispatches.length).toBe(2);

    expect(dispatches).toEqual([
      action({
        type: createActionType(key)(actionTypePatterns.query.request),
      }),
      action({
        type: createActionType(key)(actionTypePatterns.query.success),
        data: newData,
        timestamp: createTimestamp(),
      }),
    ]);
  });

  test("should throw an error", () => {
    var query = getQuery({
      actionTypePatterns,
      initOptions,
      createTimestamp,
    });

    var dispatches = [];

    var result = runSaga(
      {
        dispatch: (action) => dispatches.push(action),
        getState: () => ({
          [domain]: {
            [key]: {
              isLoading: false,
              timestamp: 100,
              data: "data",
            },
          },
        }),
      },
      query,
      {
        key: [key],
        fn: () => {
          throw new Error("error");
        },
        options: {
          staleTime: 21,
        },
      },
    );

    expect(result.error()).toEqual(new Error("error"));

    expect(dispatches.length).toBe(2);

    expect(dispatches).toEqual([
      action({
        type: createActionType(key)(actionTypePatterns.query.request),
      }),
      action({
        type: createActionType(key)(actionTypePatterns.query.failure),
        error: new Error("error"),
      }),
    ]);
  });
});
