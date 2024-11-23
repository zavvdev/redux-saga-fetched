import { v4 as uuidv4 } from "uuid";
import { InitOptions } from "./entities/InitOptions.js";
import { InstanceId } from "./entities/InstanceId.js";
import { createActionTypePatterns } from "./helpers.js";
import { getSelector } from "./modules/selector.js";
import { getReducer } from "./modules/reducer.js";
import { getQuery } from "./modules/query.js";
import { Timestamp } from "./entities/Timestamp.js";

function initSagaQuery({ domain, staleTime }) {
  var options = InitOptions.from({ domain, staleTime });

  var actionTypePatterns = createActionTypePatterns(() =>
    InstanceId.from(uuidv4),
  )(options.domain);

  var createTimestamp = () => Timestamp.from(Date.now);

  return {
    reducer: getReducer(actionTypePatterns),

    selector: getSelector(options.domain),

    query: getQuery({
      actionTypePatterns,
      initOptions: options,
      createTimestamp,
    }),
  };
}

export { initSagaQuery };
