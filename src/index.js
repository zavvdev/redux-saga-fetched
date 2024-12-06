import {
  QueryOptions,
  MutationOptions,
} from "./entities/InitOptions.js";
import { InstanceId } from "./entities/InstanceId.js";
import { Timestamp } from "./entities/Timestamp.js";
import { createActionTypePatterns } from "./modules/_helpers.js";
import { getSelector } from "./modules/selector.js";
import { getReducer } from "./modules/reducer.js";
import { getQuery } from "./modules/query.js";
import { getMutation } from "./modules/mutation.js";
import { getInvalidate } from "./modules/invalidate.js";
import { getReset } from "./modules/reset.js";
import { Domain } from "./entities/Domain.js";
import {
  DEFAULTS,
  MUTATION_DEFAULTS,
  QUERY_DEFAULTS,
} from "./config.js";
import { getCreateActionType } from "./modules/createActionType.js";

var instanceCount = 1;

/**
 * @param {{
 *  domain: string;
 *  extractError?: <T extends Error>(e: T) => any;
 *  retry?: number;
 *  retryDelay?: number;
 *  query: {
 *    staleTime: number;
 *    extractError?: <T extends Error>(e: T) => any;
 *    retry?: number;
 *    retryDelay?: number;
 *  };
 *  mutation?: {
 *    extractError?: <T extends Error>(e: T) => any;
 *    retry?: number;
 *    retryDelay?: number;
 *  };
 *  createInstanceId?: () => string;
 * }} options
 */
function initSagaQuery({
  domain,
  extractError,
  retry,
  retryDelay,
  query,
  mutation,
  createInstanceId,
}) {
  var domain_ = Domain.from(domain);

  var queryOptions = QueryOptions.from({
    staleTime: query.staleTime,
    extractError:
      extractError || query.extractError || DEFAULTS.extractError,
    retry: retry ?? query.retry ?? QUERY_DEFAULTS.retry,
    retryDelay: retryDelay ?? query.retryDelay,
  });

  var mutationOptions = MutationOptions.from({
    extractError:
      extractError || mutation?.extractError || DEFAULTS.extractError,
    retry: mutation?.retry || MUTATION_DEFAULTS.retry,
    retryDelay: mutation?.retryDelay,
  });

  var actionTypePatterns = createActionTypePatterns(() =>
    InstanceId.from(
      createInstanceId || (() => String(instanceCount++)),
    ),
  )(domain_);

  var createTimestamp = () => Timestamp.from(Date.now);

  return {
    reducer: getReducer(actionTypePatterns),

    selector: getSelector(domain_),

    query: getQuery({
      domain: domain_,
      actionTypePatterns,
      initOptions: queryOptions,
      createTimestamp,
    }),

    mutation: getMutation({
      domain: domain_,
      actionTypePatterns,
      initOptions: mutationOptions,
    }),

    invalidate: getInvalidate({
      domain: domain_,
      actionTypePatterns,
    }),

    reset: getReset({
      domain: domain_,
      actionTypePatterns,
    }),

    createActionType: getCreateActionType({ actionTypePatterns }),
  };
}

export { initSagaQuery };
