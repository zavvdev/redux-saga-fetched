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
 * createAction :: string -> string, any -> object
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
