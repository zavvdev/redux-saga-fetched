import { delay, call } from "redux-saga/effects";
import { Either as E, pipe } from "../_utils";
import { object } from "../validators";
import { EFFECT_STAGE_TYPES, EFFECT_TYPES } from "../config";

/**
 * createActionTypePatterns :: (() -> string) -> string -> patterns
 */
export var createActionTypePatterns =
  (createInstanceId) => (domain) => {
    var instanceId = createInstanceId();

    var pattern = (effectType) => (actionKind) =>
      `${effectType}_${actionKind}@${domain}#${instanceId}`;

    var queryPattern = pattern("query");
    var mutationPattern = pattern("mutation");

    return {
      [EFFECT_TYPES.query]: {
        [EFFECT_STAGE_TYPES.request]: queryPattern("request"),
        [EFFECT_STAGE_TYPES.success]: queryPattern("success"),
        [EFFECT_STAGE_TYPES.failure]: queryPattern("failure"),
        [EFFECT_STAGE_TYPES.invalidate]: queryPattern("invalidate"),
        [EFFECT_STAGE_TYPES.reset]: queryPattern("reset"),
      },
      [EFFECT_TYPES.mutation]: {
        [EFFECT_STAGE_TYPES.request]: mutationPattern("request"),
        [EFFECT_STAGE_TYPES.success]: mutationPattern("success"),
        [EFFECT_STAGE_TYPES.failure]: mutationPattern("failure"),
      },
    };
  };

/**
 * createActionType :: string -> string -> string
 */
export var createActionType = (key) => (pattern) => {
  return `${key}@${pattern}`;
};

/**
 * createAction :: string -> args -> object
 */
export var createAction =
  (key) =>
  ({ type, data, timestamp, error }) => ({
    type,
    payload: {
      key,
      data,
      timestamp,
      error,
    },
  });

/**
 * selectData :: string, string -> object -> any
 */
export var selectData =
  (domain, key) =>
  (state = {}) => {
    return state?.[domain]?.[key]?.data || null;
  };

/**
 * selectIsInProgress :: string, string -> object -> boolean
 */
export var selectIsInProgress =
  (domain, key) =>
  (state = {}) => {
    var data = state?.[domain]?.[key] || {};
    return Boolean(data.isLoading || data.isFetching);
  };

/**
 * selectKeyState :: string, string -> object -> object
 */
export var selectKeyState =
  (domain, key) =>
  (state = {}) => {
    return state?.[domain]?.[key] || {};
  };

/**
 * selectMatchedKeys :: string, string -> object -> array
 */
export var selectMatchedKeys =
  (key, domain) =>
  (state = {}) =>
    pipe(
      state?.[domain] || {},
      object,
      E.chain((x) => Object.keys(x).filter((k) => k.startsWith(key))),
      E.chainLeft(() => []),
    );

/**
 * withRetry :: () -> x, number, number -> x | throw
 */
export function* withRetry(fn, retries, retryDelay) {
  function* runner(c = 0) {
    try {
      return yield call(fn);
    } catch (e) {
      if (c === retries) {
        throw e;
      } else {
        yield delay(retryDelay ?? 1000 * (1 << c));
        return yield call(runner, c + 1);
      }
    }
  }

  return yield call(runner);
}
