import { createActionType, createKey, EffectActionTypePatterns } from "utils";
import { Key } from "types";
import { QueryActionTypeKind } from "modules/query/types";

type GetCreateQueryActionTypeFromKeyArgs = {
  effectActionTypePatterns: EffectActionTypePatterns;
}

export const getCreateQueryActionTypeFromKey = ({
  effectActionTypePatterns,
}: GetCreateQueryActionTypeFromKeyArgs) => (
  key: Key,
  actionTypeKind: QueryActionTypeKind,
) => {
  const createdKey = createKey(key);
  return createActionType({
    createdKey,
    effectActionTypePattern: effectActionTypePatterns.query[actionTypeKind],
  });
};
