import { Either as E, cond, identity, pipe } from "utilities";
import { number, string } from "../validators.js";

function InitOptions(domain, staleTime) {
  this.domain = domain;
  this.staleTime = staleTime;
}

InitOptions.from = function ({ domain, staleTime }) {
  var withErrors = (x) => x.some(E.isLeft);

  var terminate = (x) => {
    throw new Error(x.filter(E.isLeft).map(E.join).join("; "));
  };

  var init = (x) => new InitOptions(...x.map(E.join));

  return pipe(
    [string(domain), number(staleTime)],
    cond(init, [withErrors, terminate]),
  );
};

InitOptions.prototype.merge = function (nextOptions) {
  return InitOptions.from({
    domain: nextOptions.domain || this.domain,
    staleTime: pipe(
      nextOptions.staleTime,
      number,
      E.chain(identity),
      E.chainLeft(() => this.staleTime),
    ),
  });
};

export { InitOptions };
