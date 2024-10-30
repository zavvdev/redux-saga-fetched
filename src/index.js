import { InitOptions } from "./entities/InitOptions.js";

var initSagaQuery = function ({ domain, staleTime }) {
  var options = InitOptions.from({ domain, staleTime });
  console.log(options);
};

export { initSagaQuery };
