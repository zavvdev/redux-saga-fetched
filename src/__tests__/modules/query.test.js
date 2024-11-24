import { expect, test, describe } from "vitest";
import { runSaga } from "redux-saga";
import { InitOptions } from "../../entities/InitOptions";
import { getQuery, selectIsValid } from "../../modules/query";
import {
  createAction,
  createActionType,
  createActionTypePatterns,
} from "../../modules/_helpers";

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

  test("should return current data if in progress", () => {
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

    expect(result.result()).toEqual("data");
  });

  test("should return current data if it's valid", () => {
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

    expect(result.result()).toEqual("data");
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
