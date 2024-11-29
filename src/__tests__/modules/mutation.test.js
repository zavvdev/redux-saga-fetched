import { expect, test, describe } from "vitest";
import { runSaga } from "redux-saga";
import { getMutation } from "../../modules/mutation";
import {
  createAction,
  createActionType,
  createActionTypePatterns,
} from "../../modules/_helpers";
import { MutationOptions } from "../../entities/InitOptions";
import { Domain } from "../../entities/Domain";
import { DEFAULTS, MUTATION_DEFAULTS } from "../../config";
import { delay } from "../utils";

describe("mutation", () => {
  var key = "key";
  var domain = Domain.from("domain");

  var initOptions = MutationOptions.from({
    extractError: DEFAULTS.extractError,
    retry: MUTATION_DEFAULTS.retry,
  });

  var action = createAction(key);

  var actionTypePatterns = createActionTypePatterns(() => 123)(
    domain,
  );

  test("should return current data if in progress", () => {
    var mutation = getMutation({
      domain,
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
      domain,
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
      domain,
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
      domain,
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

  test("should throw an error after custom retries", async () => {
    var mutation = getMutation({
      domain,
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
          retry: 2,
        },
      },
    );

    expect(result.error()).toEqual(undefined);

    await delay(4050);

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

  test("should have custom retry delay", async () => {
    var mutation = getMutation({
      domain,
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
          retry: 2,
          retryDelay: 200,
        },
      },
    );

    expect(result.error()).toEqual(undefined);

    await delay(405);

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
