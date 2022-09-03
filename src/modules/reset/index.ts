import { put, select } from "redux-saga/effects";
import { createActionType, createKey } from "utils";
import { DATA_STATUS_TYPES, EFFECT_TYPES } from "config";

const getActionTypePattern = ({ effectType, actionTypePatterns }) => {
  let result = null;
  if (effectType === EFFECT_TYPES.mutation) {
    result = actionTypePatterns[EFFECT_TYPES.mutation].reset;
  } else if (effectType === EFFECT_TYPES.query) {
    result = actionTypePatterns[EFFECT_TYPES.query].reset;
  }
  return result;
};

export const getReset = (
  { actionTypePatterns, domain },
) => function* reset(key) {
  const createdKey = createKey(key);
  const isNotReset = yield select(
    (store) => {
      return store?.[domain]?.[createdKey]?.status !== DATA_STATUS_TYPES.reset;
    },
  );
  const effectType = yield select(
    (store) => store?.[domain]?.[createdKey]?.type,
  );
  if (isNotReset) {
    yield put({
      type: createActionType({
        createdKey,
        actionTypePattern: getActionTypePattern({
          effectType,
          actionTypePatterns,
        }),
      }),
      payload: {
        createdKey,
      },
    });
  }
};