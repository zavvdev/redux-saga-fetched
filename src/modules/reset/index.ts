import { put, select } from "redux-saga/effects";
import { createActionType, createKey, EffectActionTypePatterns } from "utils";
import { DataStatus, Domain, Effect, Key, RootState } from "types";

type GetActionTypePatternArgs = {
  effect: Effect;
  effectActionTypePatterns: EffectActionTypePatterns;
}

const getActionTypePattern = (
  { effect, effectActionTypePatterns }: GetActionTypePatternArgs,
) => {
  let result = null;
  if (effect === Effect.Mutation) {
    result = effectActionTypePatterns.mutation.reset;
  } else if (effect === Effect.Query) {
    result = effectActionTypePatterns.query.reset;
  }
  return result;
};

type GetResetArgs = {
  effectActionTypePatterns: EffectActionTypePatterns;
  domain: Domain;
}

export const getReset = ({ effectActionTypePatterns, domain }: GetResetArgs) =>
  function* reset(key: Key) {
    const createdKey = createKey(key);
    const isNotReset: boolean = yield select((state: RootState) => {
      return state?.[domain]?.[createdKey]?.status !== DataStatus.Reset;
    });
    const effect: Effect = yield select(
      (state: RootState) => state?.[domain]?.[createdKey]?.type,
    );
    const effectActionTypePattern = getActionTypePattern({
      effect,
      effectActionTypePatterns,
    });
    if (isNotReset && effectActionTypePattern) {
      yield put({
        type: createActionType({
          createdKey,
          effectActionTypePattern,
        }),
        payload: {
          createdKey,
        },
      });
    }
  };
