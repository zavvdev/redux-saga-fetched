/**
 * createActionPatterns :: (() -> string) -> string -> patterns
 */
export var createActionPatterns = (createInstanceId) => (domain) => {
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
    },
    mutation: {
      request: mutationPattern("request"),
      success: mutationPattern("success"),
      failure: mutationPattern("failure"),
    },
  };
};
