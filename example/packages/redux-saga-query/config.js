export var DEFAULTS = {
  extractError: (e) => e?.message || e?.name || "An error occurred",
};

export var QUERY_DEFAULTS = {
  retry: 3,
};

export var MUTATION_DEFAULTS = {
  retry: 0,
};
