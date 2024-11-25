import { expect, test, describe } from "vitest";
import { runSaga } from "redux-saga";
import { executor, getMutation } from "../../modules/mutation";
import {
  createAction,
  createActionType,
  createActionTypePatterns,
} from "../../modules/_helpers";

describe("mutation", () => {
  var domain = "domain";
  var key = "key";

  var action = createAction(key);
  var actionType = createActionType(key);

  var actionTypePatterns = createActionTypePatterns(() => 123)(
    domain,
  );

  test("should return current data if in progress", () => {
    var mutation = getMutation({
      actionTypePatterns,
      domain,
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
      executor,
      {
        fn: () => newData,
        action,
        actionType,
        patterns: actionTypePatterns,
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

  test("should throw an error", () => {
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
      executor,
      {
        fn: () => {
          throw new Error("error");
        },
        action,
        actionType,
        patterns: actionTypePatterns,
      },
    );

    expect(result.error()).toEqual(new Error("error"));

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
        error: new Error("error"),
      }),
    ]);
  });
});
