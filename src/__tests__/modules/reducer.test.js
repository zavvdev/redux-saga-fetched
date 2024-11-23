import { describe, test, expect } from "vitest";
import { getReducer } from "../../modules/reducer";
import {
  createAction,
  createActionTypePatterns,
} from "../../helpers";
import { Key } from "../../entities/Key";

var patterns = createActionTypePatterns(() => "instanceId")("domain");

var reducer = getReducer(patterns);

var key = Key.from(["key"]);

test("should return previous state", () => {
  var state = {
    some: "some",
  };

  var action = createAction(key)("missing_type", {});

  expect(reducer(state, action)).toEqual(state);
});

describe("query", () => {
  describe("REQUEST", () => {
    test("no prev data", () => {
      var state = {
        some: "some",
      };

      var action = createAction(key)(patterns.query.request, {});

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: true,
          isFetching: false,
          isLoaded: false,
          isError: false,
          timestamp: undefined,
          data: null,
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
        },
      };

      var action = createAction(key)(patterns.query.request, {});

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: false,
          isFetching: true,
          isLoaded: false,
          isError: false,
          timestamp: undefined,
          data: "data",
        },
      });
    });
  });

  describe("SUCCESS", () => {
    test("with data", () => {
      var state = {
        some: "some",
      };

      var action = createAction(key)(
        patterns.query.success,
        "data",
        1234,
      );

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: false,
          isFetching: false,
          isLoaded: true,
          isError: false,
          timestamp: 1234,
          data: "data",
        },
      });
    });

    test("no data", () => {
      var state = {
        some: "some",
      };

      var action = createAction(key)(
        patterns.query.success,
        null,
        1234,
      );

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: false,
          isFetching: false,
          isLoaded: true,
          isError: false,
          timestamp: 1234,
          data: null,
        },
      });
    });
  });

  describe("FAILURE", () => {
    test("no prev state", () => {
      var state = {
        some: "some",
      };

      var action = createAction(key)(patterns.query.failure);

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: false,
          isFetching: false,
          isLoaded: false,
          isError: true,
          timestamp: undefined,
          data: null,
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
        },
      };

      var action = createAction(key)(patterns.query.failure);

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: false,
          isFetching: false,
          isLoaded: false,
          isError: true,
          timestamp: undefined,
          data: "data",
        },
      });
    });
  });

  describe("INVALIDATE", () => {
    test("no prev state", () => {
      var state = {
        some: "some",
      };

      var action = createAction(key)(patterns.query.invalidate);

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: false,
          isFetching: false,
          isLoaded: false,
          isError: false,
          timestamp: undefined,
          data: null,
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
        },
      };

      var action = createAction(key)(patterns.query.invalidate);

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: false,
          isFetching: false,
          isLoaded: true,
          isError: false,
          timestamp: undefined,
          data: "data",
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

      var action = createAction(key)(patterns.mutation.request);

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: true,
          isLoaded: false,
          isError: false,
          data: null,
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
        },
      };

      var action = createAction(key)(patterns.mutation.request);

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: true,
          isLoaded: false,
          isError: false,
          data: "data",
        },
      });
    });
  });

  describe("SUCCESS", () => {
    test("with data", () => {
      var state = {
        some: "some",
      };

      var action = createAction(key)(
        patterns.mutation.success,
        "data",
      );

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: false,
          isLoaded: true,
          isError: false,
          data: "data",
        },
      });
    });

    test("no data", () => {
      var state = {
        some: "some",
      };

      var action = createAction(key)(patterns.mutation.success);

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: false,
          isLoaded: true,
          isError: false,
          data: null,
        },
      });
    });
  });

  describe("FAILURE", () => {
    test("no prev data", () => {
      var state = {
        some: "some",
      };

      var action = createAction(key)(patterns.mutation.failure);

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: false,
          isLoaded: false,
          isError: true,
          data: null,
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
        },
      };

      var action = createAction(key)(patterns.mutation.failure);

      expect(reducer(state, action)).toEqual({
        ...state,
        [key]: {
          isLoading: false,
          isLoaded: false,
          isError: true,
          data: "data",
        },
      });
    });
  });
});
