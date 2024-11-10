import { v4 as uuidv4 } from "uuid";
import { InitOptions } from "./entities/InitOptions.js";
import { InstanceId } from "./entities/InstanceId.js";
import { createActionTypePatterns } from "./helpers.js";
import { getSelector } from "./modules/selector.js";
import { getReducer } from "./modules/reducer.js";

function initSagaQuery({ domain, staleTime }) {
  var options = InitOptions.from({ domain, staleTime });

  var actionTypePatterns = createActionTypePatterns(() =>
    InstanceId.from(uuidv4),
  )(options.domain);

  // TODO: maybe we should not make selector public
  // and let to access data only through query

  return {
    reducer: getReducer(actionTypePatterns),
    selector: getSelector(options.domain),
  };
}

export { initSagaQuery };
