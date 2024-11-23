import { describe, test, expect } from "vitest";
import { Key } from "../../entities/Key";
import { getReducer } from "../../modules/reducer";
import {
  createAction,
  createActionTypePatterns,
} from "../../modules/_helpers";

var patterns = createActionTypePatterns(() => "instanceId")("domain");

var reducer = getReducer(patterns);

var key = Key.from(["key"]);

test("should return previous state", () => {
  var state = {
    some: "some",
  };

  var action = createAction(key)({ type: "missing_type", data: {} });

  expect(reducer(state, action)).toEqual(state);
});

describe("query", () => {
  describe("REQUEST", () => {
    test("no prev data", () => {
      var state = {
        some: "some",
      };

      var action = createAction(key)({
        type: patterns.query.request,
        data: {},
      });

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: true,
          isFetching: false,
          isLoaded: false,
          isError: false,
          timestamp: undefined,
          data: null,
          error: null,
        },
      });
    });

    test("with prev data", () => {
      var state = {
        some: "some",
        [key]: {
          isLoading: false,
          isFetching: false,
          isLoaded: true,
          isError: false,
          timestamp: 1234343434,
          data: "data",
          error: null,
        },
      };

      var action = createAction(key)({
        type: patterns.query.request,
        data: {},
      });

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: false,
          isFetching: true,
          isLoaded: false,
          isError: false,
          timestamp: undefined,
          data: "data",
          error: null,
        },
      });
    });
  });

  describe("SUCCESS", () => {
    test("with data", () => {
      var state = {
        some: "some",
      };

      var action = createAction(key)({
        type: patterns.query.success,
        data: "data",
        timestamp: 1234,
      });

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: false,
          isFetching: false,
          isLoaded: true,
          isError: false,
          timestamp: 1234,
          data: "data",
          error: null,
        },
      });
    });

    test("no data", () => {
      var state = {
        some: "some",
      };

      var action = createAction(key)({
        type: patterns.query.success,
        data: null,
        timestamp: 1234,
      });

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: false,
          isFetching: false,
          isLoaded: true,
          isError: false,
          timestamp: 1234,
          data: null,
          error: null,
        },
      });
    });
  });

  describe("FAILURE", () => {
    test("no prev state", () => {
      var state = {
        some: "some",
      };

      var action = createAction(key)({
        type: patterns.query.failure,
        error: "error",
      });

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: false,
          isFetching: false,
          isLoaded: false,
          isError: true,
          timestamp: undefined,
          data: null,
          error: "error",
        },
      });
    });

    test("with prev state", () => {
      var state = {
        some: "some",
        [key]: {
          isLoading: false,
          isFetching: false,
          isLoaded: true,
          isError: false,
          timestamp: 2738497,
          data: "data",
          error: null,
        },
      };

      var action = createAction(key)({
        type: patterns.query.failure,
        error: "error",
      });

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: false,
          isFetching: false,
          isLoaded: false,
          isError: true,
          timestamp: undefined,
          data: "data",
          error: "error",
        },
      });
    });
  });

  describe("INVALIDATE", () => {
    test("no prev state", () => {
      var state = {
        some: "some",
      };

      var action = createAction(key)({
        type: patterns.query.invalidate,
      });

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: false,
          isFetching: false,
          isLoaded: false,
          isError: false,
          timestamp: undefined,
          data: null,
          error: null,
        },
      });
    });

    test("with prev state", () => {
      var state = {
        some: "some",
        [key]: {
          isLoading: false,
          isFetching: false,
          isLoaded: true,
          isError: false,
          timestamp: 2738497,
          data: "data",
          error: "error",
        },
      };

      var action = createAction(key)({
        type: patterns.query.invalidate,
      });

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: false,
          isFetching: false,
          isLoaded: true,
          isError: false,
          timestamp: undefined,
          data: "data",
          error: "error",
        },
      });
    });
  });

  describe("RESET", () => {
    test("no prev state", () => {
      var state = {
        some: "some",
      };

      var action = createAction(key)({ type: patterns.query.reset });

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: false,
          isFetching: false,
          isLoaded: false,
          isError: false,
          timestamp: undefined,
          data: null,
          error: null,
        },
      });
    });

    test("with prev state", () => {
      var state = {
        some: "some",
        [key]: {
          isLoading: false,
          isFetching: false,
          isLoaded: true,
          isError: false,
          timestamp: 2738497,
          data: "data",
          error: "error",
        },
      };

      var action = createAction(key)({ type: patterns.query.reset });

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: false,
          isFetching: false,
          isLoaded: false,
          isError: false,
          timestamp: undefined,
          data: null,
          error: null,
        },
      });
    });
  });
});

describe("mutation", () => {
  describe("REQUEST", () => {
    test("no prev data", () => {
      var state = {
        some: "some",
      };

      var action = createAction(key)({
        type: patterns.mutation.request,
      });

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: true,
          isLoaded: false,
          isError: false,
          data: null,
          error: null,
        },
      });
    });

    test("with prev data", () => {
      var state = {
        some: "some",
        [key]: {
          isLoading: false,
          isLoaded: true,
          isError: false,
          data: "data",
          error: null,
        },
      };

      var action = createAction(key)({
        type: patterns.mutation.request,
      });

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: true,
          isLoaded: false,
          isError: false,
          data: "data",
          error: null,
        },
      });
    });
  });

  describe("SUCCESS", () => {
    test("with data", () => {
      var state = {
        some: "some",
      };

      var action = createAction(key)({
        type: patterns.mutation.success,
        data: "data",
      });

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: false,
          isLoaded: true,
          isError: false,
          data: "data",
          error: null,
        },
      });
    });

    test("no data", () => {
      var state = {
        some: "some",
      };

      var action = createAction(key)({
        type: patterns.mutation.success,
      });

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: false,
          isLoaded: true,
          isError: false,
          data: null,
          error: null,
        },
      });
    });
  });

  describe("FAILURE", () => {
    test("no prev data", () => {
      var state = {
        some: "some",
      };

      var action = createAction(key)({
        type: patterns.mutation.failure,
        error: "error",
      });

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: false,
          isLoaded: false,
          isError: true,
          data: null,
          error: "error",
        },
      });
    });

    test("with prev data", () => {
      var state = {
        some: "some",
        [key]: {
          isLoading: false,
          isLoaded: true,
          isError: false,
          data: "data",
          error: null,
        },
      };

      var action = createAction(key)({
        type: patterns.mutation.failure,
        error: "error",
      });

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: false,
          isLoaded: false,
          isError: true,
          data: "data",
          error: "error",
        },
      });
    });
  });
});
