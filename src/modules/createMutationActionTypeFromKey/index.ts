import { createActionType, createKey, EffectActionTypePatterns } from "utils";
import { Key } from "types";
import { MutationActionTypeKind } from "modules/mutation/types";

type GetCreateMutationActionTypeFromKeyArgs = {
  effectActionTypePatterns: EffectActionTypePatterns;
}

export const getCreateMutationActionTypeFromKey = ({
  effectActionTypePatterns,
}: GetCreateMutationActionTypeFromKeyArgs) => (
  key: Key,
  actionTypeKind: MutationActionTypeKind,
) => {
  const createdKey = createKey(key);
  return createActionType({
    createdKey,
    effectActionTypePattern: effectActionTypePatterns.mutation[actionTypeKind],
  });
};
