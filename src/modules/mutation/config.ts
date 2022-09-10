import { ActionTypeKind } from "../../types/common";
import {
  MutationEffectActionTypes,
  MutationActionTypeKinds,
} from "../../types/modules/mutation";

export const MUTATION_ACTION_TYPE_KINDS: MutationActionTypeKinds = {
  request: ActionTypeKind.Request,
  success: ActionTypeKind.Success,
  failure: ActionTypeKind.Failure,
  reset: ActionTypeKind.Reset,
};

export const MUTATION_EFFECT_ACTIONS: MutationEffectActionTypes = {
  request: "mutation/request",
  success: "mutation/success",
  failure: "mutation/failure",
  reset: "mutation/reset",
};
