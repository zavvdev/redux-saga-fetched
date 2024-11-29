import { expect, test, describe } from "vitest";
import { runSaga } from "redux-saga";
import { getMutation } from "../../modules/mutation";
import {
  createAction,
  createActionType,
  createActionTypePatterns,
} from "../../modules/_helpers";
import { InitOptions } from "../../entities/InitOptions";

describe("mutation", () => {
  var domain = "domain";
  var key = "key";

  var initOptions = InitOptions.from({
    staleTime: 1000,
    domain,
  });

  var action = createAction(key);

  var actionTypePatterns = createActionTypePatterns(() => 123)(
    domain,
  );

  test("should return current data if in progress", () => {
    var mutation = getMutation({
      actionTypePatterns,
      initOptions,
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
      mutation,
      {
        key: [key],
        fn: () => {},
      },
    );

    expect(result.result()).toEqual("data");
  });

  test("should return new data", () => {
    var mutation = getMutation({
      actionTypePatterns,
      initOptions,
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
              data: "data",
            },
          },
        }),
      },
      mutation,
      {
        key: [key],
        fn: () => newData,
      },
    );

    expect(result.result()).toEqual(newData);

    expect(dispatches.length).toBe(2);

    expect(dispatches).toEqual([
      action({
        type: createActionType(key)(
          actionTypePatterns.mutation.request,
        ),
      }),
      action({
        type: createActionType(key)(
          actionTypePatterns.mutation.success,
        ),
        data: newData,
      }),
    ]);
  });

  test("should throw an error with default extractError fn", () => {
    var mutation = getMutation({
      actionTypePatterns,
      initOptions,
    });

    var dispatches = [];

    var result = runSaga(
      {
        dispatch: (action) => dispatches.push(action),
        getState: () => ({
          [domain]: {
            [key]: {
              isLoading: false,
              data: "data",
            },
          },
        }),
      },
      mutation,
      {
        key: [key],
        fn: () => {
          throw new Error("error");
        },
      },
    );

    expect(result.error()).toEqual("error");

    expect(dispatches.length).toBe(2);

    expect(dispatches).toEqual([
      action({
        type: createActionType(key)(
          actionTypePatterns.mutation.request,
        ),
      }),
      action({
        type: createActionType(key)(
          actionTypePatterns.mutation.failure,
        ),
        error: "error",
      }),
    ]);
  });

  test("should throw an error with custom extractError fn", () => {
    var mutation = getMutation({
      actionTypePatterns,
      initOptions,
    });

    var dispatches = [];

    var result = runSaga(
      {
        dispatch: (action) => dispatches.push(action),
        getState: () => ({
          [domain]: {
            [key]: {
              isLoading: false,
              data: "data",
            },
          },
        }),
      },
      mutation,
      {
        key: [key],
        fn: () => {
          throw new TypeError("error");
        },
        options: {
          extractError: (e) => e.name,
        },
      },
    );

    expect(result.error()).toEqual("TypeError");

    expect(dispatches.length).toBe(2);

    expect(dispatches).toEqual([
      action({
        type: createActionType(key)(
          actionTypePatterns.mutation.request,
        ),
      }),
      action({
        type: createActionType(key)(
          actionTypePatterns.mutation.failure,
        ),
        error: "TypeError",
      }),
    ]);
  });
});
