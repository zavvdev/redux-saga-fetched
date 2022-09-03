import { createActionType, createActionTypePatterns, createKey } from "utils";
import { ACTION_TYPES, EFFECT_TYPES } from "config";
import { ActionType, Domain, Key } from "types";

interface GetCreateActionTypeFromKeyArgs {
  domain: Domain;
}

export const getCreateActionTypeFromKey = ({
  domain,
}: GetCreateActionTypeFromKeyArgs) => (key: Key, actionType: ActionType) => {
  const createdKey = createKey(key);
  const actionTypePatterns = createActionTypePatterns(domain);
  switch (actionType) {
    // Query

    case ACTION_TYPES[EFFECT_TYPES.query].request:
      return createActionType({
        createdKey,
        actionTypePattern: actionTypePatterns[EFFECT_TYPES.query].request,
      });
    case ACTION_TYPES[EFFECT_TYPES.query].success:
      return createActionType({
        createdKey,
        actionTypePattern: actionTypePatterns[EFFECT_TYPES.query].success,
      });
    case ACTION_TYPES[EFFECT_TYPES.query].failure:
      return createActionType({
        createdKey,
        actionTypePattern: actionTypePatterns[EFFECT_TYPES.query].failure,
      });
    case ACTION_TYPES[EFFECT_TYPES.query].invalidate:
      return createActionType({
        createdKey,
        actionTypePattern: actionTypePatterns[EFFECT_TYPES.query].invalidate,
      });
    case ACTION_TYPES[EFFECT_TYPES.query].reset:
      return createActionType({
        createdKey,
        actionTypePattern: actionTypePatterns[EFFECT_TYPES.query].reset,
      });

    // Mutation

    case ACTION_TYPES[EFFECT_TYPES.mutation].request:
      return createActionType({
        createdKey,
        actionTypePattern: actionTypePatterns[EFFECT_TYPES.mutation].request,
      });
    case ACTION_TYPES[EFFECT_TYPES.mutation].success:
      return createActionType({
        createdKey,
        actionTypePattern: actionTypePatterns[EFFECT_TYPES.mutation].success,
      });
    case ACTION_TYPES[EFFECT_TYPES.mutation].failure:
      return createActionType({
        createdKey,
        actionTypePattern: actionTypePatterns[EFFECT_TYPES.mutation].failure,
      });
    case ACTION_TYPES[EFFECT_TYPES.mutation].reset:
      return createActionType({
        createdKey,
        actionTypePattern: actionTypePatterns[EFFECT_TYPES.mutation].reset,
      });
    default:
      return null;
  }
};
