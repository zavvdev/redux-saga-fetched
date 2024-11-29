import { Either as E, cond, identity, pipe } from "utilities";
import { fn, number, string } from "../validators.js";

var DEFAULT = {
  extractError: (e) => e.message,
};

function InitOptions(domain, staleTime, extractError) {
  this.domain = domain;
  this.staleTime = staleTime;
  this.extractError = extractError;
}

InitOptions.from = function ({ domain, staleTime, extractError }) {
  var options = {
    domain,
    staleTime,
    extractError: extractError || DEFAULT.extractError,
  };

  var withErrors = (x) => x.some(E.isLeft);

  var terminate = (x) => {
    throw new Error(x.filter(E.isLeft).map(E.join).join("; "));
  };

  var init = (x) => new InitOptions(...x.map(E.join));

  return pipe(
    [
      string(options.domain),
      number(options.staleTime),
      fn(options.extractError),
    ],
    cond(init, [withErrors, terminate]),
  );
};

InitOptions.prototype.merge = function (nextOptions) {
  var next = (value, valueName, validateFn) =>
    pipe(
      value,
      validateFn,
      E.chain(identity),
      E.chainLeft(() => this[valueName]),
    );

  return InitOptions.from({
    domain: next(nextOptions.domain, "domain", string),
    staleTime: next(nextOptions.staleTime, "staleTime", number),
    extractError: next(nextOptions.extractError, "extractError", fn),
  });
};

export { InitOptions };
