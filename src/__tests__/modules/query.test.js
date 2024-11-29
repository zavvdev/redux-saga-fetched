import { expect, test, describe } from "vitest";
import { runSaga } from "redux-saga";
import { QueryOptions } from "../../entities/InitOptions";
import { getQuery, selectIsValid } from "../../modules/query";
import {
  createAction,
  createActionType,
  createActionTypePatterns,
} from "../../modules/_helpers";
import { delay } from "../utils";
import { Domain } from "../../entities/Domain";
import { DEFAULTS, QUERY_DEFAULTS } from "../../config";

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

describe("query", () => {
  var key = "key";
  var domain = Domain.from("domain");

  var createTimestamp = () => 123;

  var action = createAction(key);

  var actionTypePatterns = createActionTypePatterns(() => 123)(
    domain,
  );

  var initOptions = QueryOptions.from({
    staleTime: 1000,
    extractError: DEFAULTS.extractError,
    retry: QUERY_DEFAULTS.retry,
  });

  test("should return current data if in progress", () => {
    var query = getQuery({
      domain,
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

    expect(result.result()).toEqual("data");
  });

  test("should return current data if it's valid", () => {
    var query = getQuery({
      domain,
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

    expect(result.result()).toEqual("data");
  });

  test("should return new data", () => {
    var query = getQuery({
      domain,
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

  test("should throw an error with default extractError fn", () => {
    var query = getQuery({
      domain,
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
          retry: 0,
        },
      },
    );

    expect(result.error()).toEqual("error");

    expect(dispatches.length).toBe(2);

    expect(dispatches).toEqual([
      action({
        type: createActionType(key)(actionTypePatterns.query.request),
      }),
      action({
        type: createActionType(key)(actionTypePatterns.query.failure),
        error: "error",
      }),
    ]);
  });

  test("should throw an error with custom extractError fn", () => {
    var query = getQuery({
      domain,
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
          throw new TypeError("error");
        },
        options: {
          staleTime: 21,
          extractError: (e) => e.name,
          retry: 0,
        },
      },
    );

    expect(result.error()).toEqual("TypeError");

    expect(dispatches.length).toBe(2);

    expect(dispatches).toEqual([
      action({
        type: createActionType(key)(actionTypePatterns.query.request),
      }),
      action({
        type: createActionType(key)(actionTypePatterns.query.failure),
        error: "TypeError",
      }),
    ]);
  });

  test("should throw an error after default retry", async () => {
    var query = getQuery({
      domain,
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

    expect(result.error()).toEqual(undefined);

    await delay(8000);

    expect(result.error()).toEqual("error");

    expect(dispatches.length).toBe(2);

    expect(dispatches).toEqual([
      action({
        type: createActionType(key)(actionTypePatterns.query.request),
      }),
      action({
        type: createActionType(key)(actionTypePatterns.query.failure),
        error: "error",
      }),
    ]);
  }, 8000);

  test("should throw an error after custom retry", async () => {
    var query = getQuery({
      domain,
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
          retry: 1,
        },
      },
    );

    expect(result.error()).toEqual(undefined);

    await delay(1000);

    expect(result.error()).toEqual("error");

    expect(dispatches.length).toBe(2);

    expect(dispatches).toEqual([
      action({
        type: createActionType(key)(actionTypePatterns.query.request),
      }),
      action({
        type: createActionType(key)(actionTypePatterns.query.failure),
        error: "error",
      }),
    ]);
  });

  test("should have a custom retry delay", async () => {
    var query = getQuery({
      domain,
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
          retry: 1,
          retryDelay: 200,
        },
      },
    );

    expect(result.error()).toEqual(undefined);

    await delay(205);

    expect(result.error()).toEqual("error");

    expect(dispatches.length).toBe(2);

    expect(dispatches).toEqual([
      action({
        type: createActionType(key)(actionTypePatterns.query.request),
      }),
      action({
        type: createActionType(key)(actionTypePatterns.query.failure),
        error: "error",
      }),
    ]);
  });
});
