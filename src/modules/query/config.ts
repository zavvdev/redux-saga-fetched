import { QueryEffectActionTypes } from "../../types/modules/query";

export const QUERY_EFFECT_ACTIONS: QueryEffectActionTypes = {
  request: "query/request",
  success: "query/success",
  failure: "query/failure",
  invalidate: "query/invalidate",
  reset: "query/reset",
};
