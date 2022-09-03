import {
  all,
  call, put,
} from "redux-saga/effects";
import { createActionType, createKey } from "utils";
import { DEFAULT_MUTATION_OPTIONS, EFFECT_TYPES } from "config";
import { getInvalidate } from "../invalidate";

/*
  key: string[];
  fn: () => Promise<unknown>;
  options: {
    invalidateKeys: Array<string>[];
  }
*/

export const getMutation = (
  { actionTypePatterns, domain },
) => function* mutation({
  key, fn, options,
}) {
    const invalidate = getInvalidate({ actionTypePatterns, domain });
    const createdKey = createKey(key);
    const { invalidateKeys } = {
      ...DEFAULT_MUTATION_OPTIONS,
      ...(options || {}),
    };
    try {
      yield put({
        type: createActionType({
          createdKey,
          actionTypePattern: actionTypePatterns[EFFECT_TYPES.mutation].request,
        }),
        payload: {
          createdKey,
        },
      });
      const data = yield call(fn);
      yield put({
        type: createActionType({
          createdKey,
          actionTypePattern: actionTypePatterns[EFFECT_TYPES.mutation].success,
        }),
        payload: {
          data,
          createdKey,
        },
      });
      if (
        Array.isArray(invalidateKeys)
        && invalidateKeys.length > 0
      ) {
        yield all(invalidateKeys.map(
          (keyToInvalidate) => call(invalidate, keyToInvalidate),
        ));
      }
    } catch (e) {
      yield put({
        type: createActionType({
          createdKey,
          actionTypePattern: actionTypePatterns[EFFECT_TYPES.mutation].failure,
        }),
        payload: {
          createdKey,
        },
      });
      throw e;
    }
  };