import { MutationEffectActionTypes, MutationOptions } from "modules/mutation/types";

export const DEFAULT_MUTATION_OPTIONS: MutationOptions = {
  invalidateKeysOnSuccess: [],
};

export const MUTATION_EFFECT_ACTIONS: MutationEffectActionTypes = {
  request: "mutation/request",
  success: "mutation/success",
  failure: "mutation/failure",
  reset: "mutation/reset",
};