import { expect, test, describe } from "vitest";
import { runSaga } from "redux-saga";
import {
  getInvalidate,
  selectKeysForInvalidation,
} from "../../modules/invalidate";
import {
  createAction,
  createActionType,
  createActionTypePatterns,
} from "../../modules/_helpers";

describe("selectKeysForInvalidation", () => {
  test("should return an empty array", () => {
    var state = {
      domain: {},
    };

    expect(selectKeysForInvalidation("key", "domain")(state)).toEqual(
      [],
    );
  });

  test("should return exactly matched key", () => {
    var state = {
      domain: {
        key: {},
      },
    };

    expect(selectKeysForInvalidation("key", "domain")(state)).toEqual(
      ["key"],
    );
  });

  test("should return partially matched key", () => {
    var state = {
      domain: {
        key1: {},
        key2: {},
      },
    };

    expect(selectKeysForInvalidation("key", "domain")(state)).toEqual(
      ["key1", "key2"],
    );
  });
});

describe("invalidate", () => {
  var domain = "domain";

  var actionTypePatterns = createActionTypePatterns(() => 123)(
    domain,
  );

  test("should not invalidate any state", () => {
    var invalidate = getInvalidate({
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
      invalidate,
      {
        key: ["key"],
      },
    );

    expect(dispatches).toEqual([]);
  });

  test("should invalidate exactly matched key", () => {
    var invalidate = getInvalidate({
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
              isValid: true,
              isLoading: false,
              isFetching: false,
            },
          },
        }),
      },
      invalidate,
      {
        key: ["key"],
      },
    );

    expect(dispatches.length).toBe(1);

    expect(dispatches).toEqual([
      createAction("key")({
        type: createActionType("key")(
          actionTypePatterns.query.invalidate,
        ),
      }),
    ]);
  });

  test("should invalidate partially matched keys", () => {
    var invalidate = getInvalidate({
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
              isValid: true,
              isLoading: false,
              isFetching: false,
            },
            key2: {
              isValid: true,
              isLoading: false,
              isFetching: false,
            },
          },
        }),
      },
      invalidate,
      {
        key: ["key"],
      },
    );

    expect(dispatches.length).toBe(2);

    expect(dispatches).toEqual([
      createAction("key1")({
        type: createActionType("key1")(
          actionTypePatterns.query.invalidate,
        ),
      }),
      createAction("key2")({
        type: createActionType("key2")(
          actionTypePatterns.query.invalidate,
        ),
      }),
    ]);
  });

  test("should not invalidate already invalidated keys", () => {
    var invalidate = getInvalidate({
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
              isValid: false,
              isLoading: false,
              isFetching: false,
            },
            key2: {
              isValid: true,
              isLoading: false,
              isFetching: false,
            },
          },
        }),
      },
      invalidate,
      {
        key: ["key"],
      },
    );

    expect(dispatches.length).toBe(1);

    expect(dispatches).toEqual([
      createAction("key2")({
        type: createActionType("key2")(
          actionTypePatterns.query.invalidate,
        ),
      }),
    ]);
  });

  test("should not invalidate if isLoading=true", () => {
    var invalidate = getInvalidate({
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
              isValid: true,
              isLoading: true,
              isFetching: false,
            },
            key2: {
              isValid: true,
              isLoading: false,
              isFetching: false,
            },
          },
        }),
      },
      invalidate,
      {
        key: ["key"],
      },
    );

    expect(dispatches.length).toBe(1);

    expect(dispatches).toEqual([
      createAction("key2")({
        type: createActionType("key2")(
          actionTypePatterns.query.invalidate,
        ),
      }),
    ]);
  });

  test("should not invalidate if isFetching=true", () => {
    var invalidate = getInvalidate({
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
              isValid: true,
              isLoading: false,
              isFetching: true,
            },
            key2: {
              isValid: true,
              isLoading: false,
              isFetching: false,
            },
          },
        }),
      },
      invalidate,
      {
        key: ["key"],
      },
    );

    expect(dispatches.length).toBe(1);

    expect(dispatches).toEqual([
      createAction("key2")({
        type: createActionType("key2")(
          actionTypePatterns.query.invalidate,
        ),
      }),
    ]);
  });
});
