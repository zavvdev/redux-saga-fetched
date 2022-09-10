import { ActionTypeKind } from "../../types/common";
import {
  QueryActionTypeKinds,
  QueryEffectActionTypes,
} from "../../types/modules/query";

export const QUERY_ACTION_TYPE_KINDS: QueryActionTypeKinds = {
  request: ActionTypeKind.Request,
  success: ActionTypeKind.Success,
  failure: ActionTypeKind.Failure,
  invalidate: ActionTypeKind.Invalidate,
  reset: ActionTypeKind.Reset,
};

export const QUERY_EFFECT_ACTIONS: QueryEffectActionTypes = {
  request: "query/request",
  success: "query/success",
  failure: "query/failure",
  invalidate: "query/invalidate",
  reset: "query/reset",
};
