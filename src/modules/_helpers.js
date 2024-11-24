import { Either as E, pipe } from "utilities";
import { object } from "../validators";

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
      query: {
        request: queryPattern("request"),
        success: queryPattern("success"),
        failure: queryPattern("failure"),
        invalidate: queryPattern("invalidate"),
        reset: queryPattern("reset"),
      },
      mutation: {
        request: mutationPattern("request"),
        success: mutationPattern("success"),
        failure: mutationPattern("failure"),
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
