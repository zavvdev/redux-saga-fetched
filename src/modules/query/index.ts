import { call, delay, put, select, spawn } from "redux-saga/effects";
import { getInvalidate } from "modules/invalidate";
import { createActionType, createKey, EffectActionTypePatterns } from "utils";
import { DEFAULT_QUERY_OPTIONS } from "modules/query/config";
import { Domain, Key } from "types";
import { QueryOptions } from "./types";

/* --------- */

type DelayedInvalidateArgs = {
  key: Key;
  invalidateFn: (key: Key) => void;
  ms: number
}

function* delayedInvalidate({ key, invalidateFn, ms }: DelayedInvalidateArgs) {
  yield Promise.resolve();
  yield delay(ms);
  yield call(invalidateFn, key);
}

/* --------- */

type GetQueryArgs = {
  effectActionTypePatterns: EffectActionTypePatterns;
  domain: Domain;
}

type QueryFnArgs<T = unknown> = {
  key: Key;
  fn: () => Promise<T> | T;
  options: QueryOptions;
}

export const getQuery = ({ effectActionTypePatterns, domain }: GetQueryArgs) =>
  function* query<T>({ key, fn, options }: QueryFnArgs<T>) {
    const createdKey = createKey(key);

    try {
      const invalidate = getInvalidate({ effectActionTypePatterns, domain });

      const { useCache, invalidateInterval } = {
        ...DEFAULT_QUERY_OPTIONS,
        ...(options || {}),
      };

      const isValid: boolean = yield select(store => {
        return store?.[domain]?.[createdKey]?.isValid;
      });
      if (useCache && isValid) {
        return;
      }
      yield put({
        type: createActionType({
          createdKey,
          effectActionTypePattern: effectActionTypePatterns.query.request,
        }),
        payload: {
          createdKey,
        },
      });
      const data: T = yield call(fn);
      yield put({
        type: createActionType({
          createdKey,
          effectActionTypePattern: effectActionTypePatterns.query.success,
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
          effectActionTypePattern: effectActionTypePatterns.query.failure,
        }),
        payload: {
          createdKey,
        },
      });
      throw e;
    }
  };
