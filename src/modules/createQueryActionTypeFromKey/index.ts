import { createActionType, createKey } from "../../utils";
import { Key } from "../../types/common";
import { QueryActionTypeKind } from "../../types/modules/query";
import { EffectActionTypePatterns } from "../../types/action";

type GetCreateQueryActionTypeFromKeyArgs = {
  effectActionTypePatterns: EffectActionTypePatterns;
};

export const getCreateQueryActionTypeFromKey =
  ({ effectActionTypePatterns }: GetCreateQueryActionTypeFromKeyArgs) =>
  (key: Key, actionTypeKind: QueryActionTypeKind) => {
    const createdKey = createKey(key);
    return createActionType({
      createdKey,
      effectActionTypePattern: effectActionTypePatterns.query[actionTypeKind],
    });
  };
