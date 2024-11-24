import { expect, test, describe } from "vitest";
import { runSaga } from "redux-saga";
import { getReset } from "../../modules/reset";
import {
  createAction,
  createActionType,
  createActionTypePatterns,
} from "../../modules/_helpers";

describe("reset", () => {
  var domain = "domain";

  var actionTypePatterns = createActionTypePatterns(() => 123)(
    domain,
  );

  test("should not reset any state", () => {
    var reset = getReset({
      actionTypePatterns,
      domain,
    });

    var dispatches = [];

    runSaga(
      {
        dispatch: (action) => dispatches.push(action),
        getState: () => ({
          [domain]: {},
        }),
      },
      reset,
      {
        key: ["key"],
      },
    );

    expect(dispatches).toEqual([]);
  });

  test("should reset exactly matched key", () => {
    var reset = getReset({
      actionTypePatterns,
      domain,
    });

    var dispatches = [];

    runSaga(
      {
        dispatch: (action) => dispatches.push(action),
        getState: () => ({
          [domain]: {
            key: {
              isReset: false,
            },
          },
        }),
      },
      reset,
      {
        key: ["key"],
      },
    );

    expect(dispatches.length).toBe(1);

    expect(dispatches).toEqual([
      createAction("key")({
        type: createActionType("key")(actionTypePatterns.query.reset),
      }),
    ]);
  });

  test("should reset partially matched keys", () => {
    var reset = getReset({
      actionTypePatterns,
      domain,
    });

    var dispatches = [];

    runSaga(
      {
        dispatch: (action) => dispatches.push(action),
        getState: () => ({
          [domain]: {
            key1: {
              isReset: false,
            },
            key2: {
              isReset: false,
            },
          },
        }),
      },
      reset,
      {
        key: ["key"],
      },
    );

    expect(dispatches.length).toBe(2);

    expect(dispatches).toEqual([
      createAction("key1")({
        type: createActionType("key1")(
          actionTypePatterns.query.reset,
        ),
      }),
      createAction("key2")({
        type: createActionType("key2")(
          actionTypePatterns.query.reset,
        ),
      }),
    ]);
  });

  test("should not reset already reset keys", () => {
    var reset = getReset({
      actionTypePatterns,
      domain,
    });

    var dispatches = [];

    runSaga(
      {
        dispatch: (action) => dispatches.push(action),
        getState: () => ({
          [domain]: {
            key1: {
              isReset: false,
            },
            key2: {
              isReset: true,
            },
          },
        }),
      },
      reset,
      {
        key: ["key"],
      },
    );

    expect(dispatches.length).toBe(1);

    expect(dispatches).toEqual([
      createAction("key1")({
        type: createActionType("key1")(
          actionTypePatterns.query.reset,
        ),
      }),
    ]);
  });

  test("should not reset if isReset=true", () => {
    var reset = getReset({
      actionTypePatterns,
      domain,
    });

    var dispatches = [];

    runSaga(
      {
        dispatch: (action) => dispatches.push(action),
        getState: () => ({
          [domain]: {
            key1: {
              isReset: false,
            },
            key2: {
              isReset: true,
            },
          },
        }),
      },
      reset,
      {
        key: ["key"],
      },
    );

    expect(dispatches.length).toBe(1);

    expect(dispatches).toEqual([
      createAction("key1")({
        type: createActionType("key1")(
          actionTypePatterns.query.reset,
        ),
      }),
    ]);
  });
});
