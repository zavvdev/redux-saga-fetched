import { put, select } from "redux-saga/effects";
import { EffectActionTypePatterns } from "../../types/action";
import { createActionType, createKey } from "../../utils";
import { Domain, Key } from "../../types/common";

type GetInvalidateArgs = {
  effectActionTypePatterns: EffectActionTypePatterns;
  domain: Domain;
};

export const getInvalidate = ({
  effectActionTypePatterns,
  domain,
}: GetInvalidateArgs) =>
  function* invalidate(key: Key) {
    const createdKey = createKey(key);
    const isNotInvalidated: boolean = yield select(
      (store) => store?.[domain]?.[createdKey]?.isValid === true,
    );
    if (isNotInvalidated) {
      yield put({
        type: createActionType({
          createdKey,
          effectActionTypePattern: effectActionTypePatterns.query.invalidate,
        }),
        payload: {
          createdKey,
        },
      });
    }
  };
