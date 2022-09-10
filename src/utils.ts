import { MUTATION_EFFECT_ACTIONS } from "./modules/mutation/config";
import { QUERY_EFFECT_ACTIONS } from "./modules/query/config";
import {
  CreatedKey,
  Domain,
  Key,
} from "./types/common";
import { ActionType, ActionTypePattern, EffectActionTypePatterns } from "./types/action";

/* --------- */

export const createKey = (key: Key): CreatedKey => key.join("_");

/* --------- */

type CreateActionTypeArgs<P extends ActionTypePattern = ActionTypePattern> = {
  createdKey: CreatedKey;
  effectActionTypePattern: P;
};

export function createActionType<
P extends ActionTypePattern = ActionTypePattern
>({
  createdKey, effectActionTypePattern,
}: CreateActionTypeArgs<P>): ActionType<P> {
  return `${createdKey}_${effectActionTypePattern}`;
}

/* --------- */

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
