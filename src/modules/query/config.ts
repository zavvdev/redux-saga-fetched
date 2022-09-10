import {
  QueryEffectActionTypes,
  QueryOptions,
} from "../../types/modules/query";

export const DEFAULT_QUERY_OPTIONS: QueryOptions = {
  useCache: true,
  invalidateInterval: 0,
};

export const QUERY_EFFECT_ACTIONS: QueryEffectActionTypes = {
  request: "query/request",
  success: "query/success",
  failure: "query/failure",
  invalidate: "query/invalidate",
  reset: "query/reset",
};
