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

var queryStates = {
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
      data: dataFallback(state?.[payload.key]?.data),
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
      data: dataFallback(payload?.data),
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
      data: dataFallback(state?.[payload?.key]?.data),
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
      data: dataFallback(state?.[payload.key]?.data),
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
  return function (state, action = {}) {
    var { query: q, mutation: m } = actionTypePatterns;

    var qs = queryStates;
    var ms = mutationStates;

    var stateIdentity = () => state;

    var stateGetters = [
      [q.request, qs.request],
      [q.success, qs.success],
      [q.failure, qs.failure],
      [q.invalidate, qs.invalidate],
      [m.request, ms.request],
      [m.success, ms.success],
      [m.failure, ms.failure],
    ];

    var mapToState = cond(
      stateIdentity,
      ...stateGetters.map(([pattern, getNextState]) => [
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
