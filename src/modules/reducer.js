import { pipe, Either as E, cond } from "utilities";
import { string } from "../validators";

// ================
// Utilities
// ================

var validateAction = (action) =>
  E.isRight(string(action.type)) &&
  E.isRight(string(action.payload?.key))
    ? E.right(action)
    : E.left(action);

var actionTypeMatch = (pattern) => (action) =>
  action.type.includes(pattern);

var dataFallback = (data) => data || null;

var mergeStates = (prevState) => (nextState) => ({
  ...prevState,
  ...nextState,
});

var assignKey = (key) => (nextKeyState) => ({
  [key]: nextKeyState,
});

// ================
// States
// ================

export var queryStates = {
  /**
   * request :: state -> action -> keylessQueryState
   */
  request: (state) => (action) => {
    var { payload } = action;

    var isLoading = !state?.[payload.key]?.data;
    var isFetching = !!state?.[payload.key]?.data;

    return {
      isLoading,
      isFetching,
      isLoaded: false,
      isError: false,
      isValid: false,
      timestamp: undefined,
      data: dataFallback(state?.[payload.key]?.data),
      error: null,
    };
  },

  /**
   * success :: state -> action -> keylessQueryState
   */
  success:
    () =>
    ({ payload }) => ({
      isLoading: false,
      isFetching: false,
      isLoaded: true,
      isError: false,
      isValid: true,
      timestamp: payload.timestamp,
      data: dataFallback(payload?.data),
      error: null,
    }),

  /**
   * failure :: state -> action -> keylessQueryState
   */
  failure:
    (state) =>
    ({ payload }) => ({
      isLoading: false,
      isFetching: false,
      isLoaded: false,
      isError: true,
      isValid: false,
      timestamp: undefined,
      data: dataFallback(state?.[payload?.key]?.data),
      error: payload.error || null,
    }),

  /**
   * invalidate :: state -> action -> keylessQueryState
   */
  invalidate:
    (state) =>
    ({ payload }) => ({
      isLoading: !!state?.[payload.key]?.isLoading,
      isFetching: !!state?.[payload.key]?.isFetching,
      isLoaded: !!state?.[payload.key]?.isLoaded,
      isError: !!state?.[payload.key]?.isError,
      isValid: false,
      timestamp: undefined,
      data: dataFallback(state?.[payload.key]?.data),
      error: state?.[payload.key]?.error || null,
    }),

  /**
   * reset :: state -> action -> keylessQueryState
   */
  reset: () => () => ({
    isLoading: false,
    isFetching: false,
    isLoaded: false,
    isError: false,
    isValid: false,
    timestamp: undefined,
    data: null,
    error: null,
  }),
};

var mutationStates = {
  /**
   * request :: state -> action -> keylessMutationState
   */
  request:
    (state) =>
    ({ payload }) => ({
      isLoading: true,
      isLoaded: false,
      isError: false,
      data: dataFallback(state?.[payload.key]?.data),
      error: null,
    }),

  /**
   * success :: state -> action -> keylessMutationState
   */
  success:
    () =>
    ({ payload }) => ({
      isLoading: false,
      isLoaded: true,
      isError: false,
      data: dataFallback(payload?.data),
      error: null,
    }),

  /**
   * failure :: state -> action -> keylessMutationState
   */
  failure:
    (state) =>
    ({ payload }) => ({
      isLoading: false,
      isLoaded: false,
      isError: true,
      data: dataFallback(state?.[payload?.key]?.data),
      error: payload.error || null,
    }),
};

// ================
// Getter
// ================

var toNextState = (prevState, getNextState) => (action) =>
  pipe(
    getNextState(prevState)(action),
    assignKey(action.payload.key),
    mergeStates(prevState),
  );

var getReducer = function (actionTypePatterns) {
  var { query, mutation } = actionTypePatterns;

  var patternToStateGetter = [
    [query.request, queryStates.request],
    [query.success, queryStates.success],
    [query.failure, queryStates.failure],
    [query.invalidate, queryStates.invalidate],
    [query.reset, queryStates.reset],
    [mutation.request, mutationStates.request],
    [mutation.success, mutationStates.success],
    [mutation.failure, mutationStates.failure],
  ];

  return function (state, action = {}) {
    var stateIdentity = () => state;

    var mapToState = cond(
      stateIdentity,
      ...patternToStateGetter.map(([pattern, getNextState]) => [
        actionTypeMatch(pattern),
        toNextState(state, getNextState),
      ]),
    );

    return pipe(
      action,
      validateAction,
      E.chain(mapToState),
      E.chainLeft(stateIdentity),
    );
  };
};

export { getReducer };
