import { put, select } from "redux-saga/effects";
import { EffectActionTypePatterns } from "../../types/action";
import { createActionType, createKey } from "../../utils";
import { Domain, Key } from "../../types/common";
import { State } from "../../types/state";
import { QueryEffectState } from "../../types/modules/query";

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
    const isKeyDataPresent: boolean = yield select(
      (state: State<QueryEffectState>) => {
        return !!state?.[domain]?.[createdKey];
      },
    );
    if (isKeyDataPresent) {
      const isNotInvalidated: boolean = yield select(
        (state: State<QueryEffectState>) => {
          return state[domain][createdKey]?.isValid === true;
        },
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
    }
  };
