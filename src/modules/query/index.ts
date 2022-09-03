import {
  call, delay, put, select, spawn,
} from "redux-saga/effects";
import { getInvalidate } from "../invalidate";
import { createActionType, createKey } from "../../utils";
import {
  DEFAULT_QUERY_OPTIONS, EFFECT_TYPES,
} from "../../config";

/*
  key: string[];
  fn: () => Promise<unknown>;
  options: {
    useCache: boolean;
    invalidateInterval: number;
  };
*/

function* delayedInvalidate({ key, invalidateFn, ms }) {
  yield Promise.resolve();
  yield delay(ms);
  yield call(invalidateFn, key);
}

export const getQuery = (
  { actionTypePatterns, domain },
) => function* query({
  key, fn, options,
}) {
    const createdKey = createKey(key);

    try {
      const invalidate = getInvalidate({ actionTypePatterns, domain });

      const { useCache, invalidateInterval } = {
        ...DEFAULT_QUERY_OPTIONS,
        ...(options || {}),
      };

      const isValid = yield select((store) => {
        return store?.[domain]?.[createdKey]?.isValid;
      });
      if (useCache && isValid) {
        return;
      }
      yield put({
        type: createActionType({
          createdKey,
          actionTypePattern: actionTypePatterns[EFFECT_TYPES.query].request,
        }),
        payload: {
          createdKey,
        },
      });
      const data = yield call(fn);
      yield put({
        type: createActionType({
          createdKey,
          actionTypePattern: actionTypePatterns[EFFECT_TYPES.query].success,
        }),
        payload: {
          data,
          createdKey,
        },
      });
      if (invalidateInterval) {
        yield spawn(delayedInvalidate, {
          key,
          invalidateFn: invalidate,
          ms: invalidateInterval,
        });
      }
    } catch (e) {
      yield put({
        type: createActionType({
          createdKey,
          actionTypePattern: actionTypePatterns[EFFECT_TYPES.query].failure,
        }),
        payload: {
          createdKey,
        },
      });
      throw e;
    }
  };