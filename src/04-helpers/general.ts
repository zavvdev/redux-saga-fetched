import { ActionKind, Domain, Effect } from "../01-types/general";
import {
  composeActionTypePattern,
  genInstanceId,
} from "../03-utilities/general";

export function createEffectActionTypePatterns(domain: Domain) {
  const instanceId = genInstanceId();

  const pattern = <E extends Effect, A extends ActionKind>(
    effect: E,
    actionKind: A,
  ) => composeActionTypePattern(domain, effect, actionKind, instanceId);

  return {
    [Effect.Query]: {
      [ActionKind.Request]: pattern(Effect.Query, ActionKind.Request),
      [ActionKind.Success]: pattern(Effect.Query, ActionKind.Success),
      [ActionKind.Failure]: pattern(Effect.Query, ActionKind.Failure),
      [ActionKind.Invalidate]: pattern(Effect.Query, ActionKind.Invalidate),
      [ActionKind.Reset]: pattern(Effect.Query, ActionKind.Reset),
    },
    [Effect.Mutation]: {
      [ActionKind.Request]: pattern(Effect.Mutation, ActionKind.Request),
      [ActionKind.Success]: pattern(Effect.Mutation, ActionKind.Success),
      [ActionKind.Failure]: pattern(Effect.Mutation, ActionKind.Failure),
      [ActionKind.Reset]: pattern(Effect.Mutation, ActionKind.Reset),
    },
  };
}

export type EffectActionTypePatterns = ReturnType<
  typeof createEffectActionTypePatterns
>;
