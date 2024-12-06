export var DEFAULTS = {
  extractError: (e) => e?.message || e?.name || "An error occurred",
};

export var QUERY_DEFAULTS = {
  retry: 3,
};

export var MUTATION_DEFAULTS = {
  retry: 0,
};

export var EFFECT_TYPES = {
  query: "query",
  mutation: "mutation",
};

export var EFFECT_STAGE_TYPES = {
  request: "request",
  success: "success",
  failure: "failure",
  invalidate: "invalidate",
  reset: "reset",
};
