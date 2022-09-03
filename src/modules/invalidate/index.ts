import { put, select } from "redux-saga/effects";
import { createActionType, createKey } from "utils";
import { EFFECT_TYPES } from "config";

export const getInvalidate = ({
  actionTypePatterns,
  domain,
}) => function* invalidate(key) {
  const createdKey = createKey(key);
  const isNotInvalidated = yield select(
    (store) => store?.[domain]?.[createdKey]?.isValid === true,
  );
  if (isNotInvalidated) {
    yield put({
      type: createActionType({
        createdKey,
        actionTypePattern: actionTypePatterns[EFFECT_TYPES.query].invalidate,
      }),
      payload: {
        createdKey,
      },
    });
  }
};