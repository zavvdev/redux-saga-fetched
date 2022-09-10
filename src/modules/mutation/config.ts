import { MutationEffectActionTypes } from "../../types/modules/mutation";

export const MUTATION_EFFECT_ACTIONS: MutationEffectActionTypes = {
  request: "mutation/request",
  success: "mutation/success",
  failure: "mutation/failure",
  reset: "mutation/reset",
};
