import { MUTATION_EFFECT_ACTIONS } from "modules/mutation/config";
import { MutationEffectActionTypePatterns } from "modules/mutation/types";
import { QUERY_EFFECT_ACTIONS } from "modules/query/config";
import { QueryEffectActionTypePatterns } from "modules/query/types";
import {
  ActionType,
  CreatedKey,
  Domain,
  Effect,
  EffectActionTypePattern,
  Key,
} from "types";

/* --------- */

export const createKey = (key: Key): CreatedKey => key.join("_");

/* --------- */

type CreateActionTypeArgs = {
  createdKey: CreatedKey;
  effectActionTypePattern: EffectActionTypePattern;
};

export const createActionType = ({
  createdKey, effectActionTypePattern,
}: CreateActionTypeArgs): ActionType => {
  return `${createdKey}_${effectActionTypePattern}`;
};

/* --------- */

export type EffectActionTypePatterns = {
  [Effect.Query]: QueryEffectActionTypePatterns;
  [Effect.Mutation]: MutationEffectActionTypePatterns;
};

export const createEffectActionTypePatterns = (
  domain: Domain,
): EffectActionTypePatterns => ({
  query: {
    request: `${domain}@${QUERY_EFFECT_ACTIONS.request}`,
    success: `${domain}@${QUERY_EFFECT_ACTIONS.success}`,
    failure: `${domain}@${QUERY_EFFECT_ACTIONS.failure}`,
    invalidate: `${domain}@${QUERY_EFFECT_ACTIONS.invalidate}`,
    reset: `${domain}@${QUERY_EFFECT_ACTIONS.reset}`,
  },
  mutation: {
    request: `${domain}@${MUTATION_EFFECT_ACTIONS.request}`,
    success: `${domain}@${MUTATION_EFFECT_ACTIONS.success}`,
    failure: `${domain}@${MUTATION_EFFECT_ACTIONS.failure}`,
    reset: `${domain}@${MUTATION_EFFECT_ACTIONS.reset}`,
  },
});

/* --------- */
