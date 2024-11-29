import { Either as E, cond, identity, pipe } from "../_utils";
import { fn, number, numberOrUndefined } from "../validators.js";

/**
 * validate :: Object -> (x, y, (x) -> Either) -> x | Object[y]
 */
var validate = (target) => (value, valueName, validateFn) =>
  pipe(
    value,
    validateFn,
    E.chain(identity),
    E.chainLeft(() => target[valueName]),
  );

/**
 * instantiate :: Constructor -> [Either] -> Object | throw
 */
var instantiate = (Constructor, values) => {
  var withErrors = (x) => x.some(E.isLeft);

  var terminate = (x) => {
    throw new Error(x.filter(E.isLeft).map(E.join).join("; "));
  };

  var init = (Constructor) => (x) =>
    new Constructor(...x.map(E.join));

  return pipe(
    values,
    cond(init(Constructor), [withErrors, terminate]),
  );
};

// ===================

var QueryOptions = (() => {
  function Options(staleTime, extractError, retry, retryDelay) {
    this.staleTime = staleTime;
    this.extractError = extractError;
    this.retry = retry;
    this.retryDelay = retryDelay;
  }

  Options.from = function ({
    staleTime,
    extractError,
    retry,
    retryDelay,
  }) {
    return instantiate(Options, [
      number(staleTime),
      fn(extractError),
      number(retry),
      numberOrUndefined(retryDelay),
    ]);
  };

  Options.prototype.merge = function (nextOptions) {
    var next = validate(this);

    return Options.from({
      staleTime: next(nextOptions.staleTime, "staleTime", number),
      extractError: next(
        nextOptions.extractError,
        "extractError",
        fn,
      ),
      retry: next(nextOptions.retry, "retry", number),
      retryDelay: next(nextOptions.retryDelay, "retryDelay", number),
    });
  };

  return Options;
})();

// ===================

var MutationOptions = (() => {
  function Options(extractError, retry, retryDelay) {
    this.extractError = extractError;
    this.retry = retry;
    this.retryDelay = retryDelay;
  }

  Options.from = function ({ extractError, retry, retryDelay }) {
    return instantiate(Options, [
      fn(extractError),
      number(retry),
      numberOrUndefined(retryDelay),
    ]);
  };

  Options.prototype.merge = function (nextOptions) {
    var next = validate(this);

    return Options.from({
      extractError: next(
        nextOptions.extractError,
        "extractError",
        fn,
      ),
      retry: next(nextOptions.retry, "retry", number),
      retryDelay: next(nextOptions.retryDelay, "retryDelay", number),
    });
  };

  return Options;
})();

export { QueryOptions, MutationOptions };
