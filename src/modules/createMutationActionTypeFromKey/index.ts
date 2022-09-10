import { createActionType, createKey } from "../../utils";
import { Key } from "../../types/common";
import { MutationActionTypeKind } from "../../types/modules/mutation";
import { EffectActionTypePatterns } from "../../types/action";

type GetCreateMutationActionTypeFromKeyArgs = {
  effectActionTypePatterns: EffectActionTypePatterns;
};

export const getCreateMutationActionTypeFromKey =
  ({ effectActionTypePatterns }: GetCreateMutationActionTypeFromKeyArgs) =>
  (key: Key, actionTypeKind: `${MutationActionTypeKind}`) => {
    const createdKey = createKey(key);
    return createActionType({
      createdKey,
      effectActionTypePattern:
        effectActionTypePatterns.mutation[actionTypeKind],
    });
  };
