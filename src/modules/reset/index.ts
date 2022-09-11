import { put, select } from "redux-saga/effects";
import { createActionType, createKey } from "../../utils";
import { DataStatus, Domain, Effect, Key } from "../../types/common";
import { State } from "../../types/state";
import { EffectActionTypePatterns } from "../../types/action";
import { createActionWithoutData } from "../reducer/utils";

type GetActionTypePatternArgs = {
  effect: Effect;
  effectActionTypePatterns: EffectActionTypePatterns;
};

const getActionTypePattern = ({
  effect,
  effectActionTypePatterns,
}: GetActionTypePatternArgs) => {
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
};

export const getReset = ({
  effectActionTypePatterns,
  domain,
}: GetResetArgs) => {
  return function* reset(key: Key) {
    const createdKey = createKey(key);
    const isKeyDataPresent: boolean = yield select((state: State) => {
      return !!state?.[domain]?.[createdKey];
    });
    if (isKeyDataPresent) {
      const isNotReset: boolean = yield select((state: State) => {
        return state[domain][createdKey]?.status !== DataStatus.Reset;
      });
      const effect: Effect = yield select((state: State) => {
        return state[domain][createdKey]?.type;
      });
      const effectActionTypePattern = getActionTypePattern({
        effect,
        effectActionTypePatterns,
      });
      if (isNotReset && effectActionTypePattern) {
        yield put(
          createActionWithoutData({
            type: createActionType({
              createdKey,
              effectActionTypePattern,
            }),
            createdKey,
          }),
        );
      }
    }
  };
};
