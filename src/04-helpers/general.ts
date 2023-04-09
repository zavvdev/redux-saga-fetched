import { ActionKind, Domain, Effect } from "../01-types/general";
import {
  composeActionTypePattern,
  genInstanceId,
} from "../03-utilities/general";

export function createEffectActionTypePatterns(domain: Domain) {
  const instanceId = genInstanceId();

  const pattern = <A extends ActionKind>(actionType: A) =>
    composeActionTypePattern(domain, actionType, instanceId);

  return {
    [Effect.Query]: {
      [ActionKind.request]: pattern(ActionKind.request),
      [ActionKind.success]: pattern(ActionKind.success),
      [ActionKind.failure]: pattern(ActionKind.failure),
      [ActionKind.invalidate]: pattern(ActionKind.invalidate),
      [ActionKind.reset]: pattern(ActionKind.reset),
    },
    [Effect.Mutation]: {
      [ActionKind.request]: pattern(ActionKind.request),
      [ActionKind.success]: pattern(ActionKind.success),
      [ActionKind.failure]: pattern(ActionKind.failure),
      [ActionKind.reset]: pattern(ActionKind.reset),
    },
  };
}

export type EffectActionTypePatterns = ReturnType<
  typeof createEffectActionTypePatterns
>;
