import { ActionType, Domain, Effect } from "../01-types/general";
import {
  composeActionTypePattern,
  genInstanceId,
} from "../03-utilities/general";

export function createEffectActionTypePatterns(domain: Domain) {
  const instanceId = genInstanceId();

  const pattern = <A extends ActionType>(actionType: A) =>
    composeActionTypePattern(domain, actionType, instanceId);

  return {
    [Effect.query]: {
      [ActionType.request]: pattern(ActionType.request),
      [ActionType.success]: pattern(ActionType.success),
      [ActionType.failure]: pattern(ActionType.failure),
      [ActionType.invalidate]: pattern(ActionType.invalidate),
      [ActionType.reset]: pattern(ActionType.reset),
    },
    [Effect.mutation]: {
      [ActionType.request]: pattern(ActionType.request),
      [ActionType.success]: pattern(ActionType.success),
      [ActionType.failure]: pattern(ActionType.failure),
      [ActionType.reset]: pattern(ActionType.reset),
    },
  };
}

export type EffectActionTypePatterns = ReturnType<
  typeof createEffectActionTypePatterns
>;
