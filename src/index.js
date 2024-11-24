import { v4 as uuidv4 } from "uuid";
import { InitOptions } from "./entities/InitOptions.js";
import { InstanceId } from "./entities/InstanceId.js";
import { Timestamp } from "./entities/Timestamp.js";
import { createActionTypePatterns } from "./modules/_helpers.js";
import { getSelector } from "./modules/selector.js";
import { getReducer } from "./modules/reducer.js";
import { getQuery } from "./modules/query.js";
import { getMutation } from "./modules/mutation.js";
import { getInvalidate } from "./modules/invalidate.js";
import { getReset } from "./modules/reset.js";

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

    mutation: getMutation({
      actionTypePatterns,
      domain: options.domain,
    }),

    invalidate: getInvalidate({
      actionTypePatterns,
      domain: options.domain,
    }),

    reset: getReset({
      actionTypePatterns,
      domain: options.domain,
    }),
  };
}

export { initSagaQuery };
