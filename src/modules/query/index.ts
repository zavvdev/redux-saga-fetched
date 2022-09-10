import { call, put, select } from "redux-saga/effects";
import { createActionType, createKey } from "../../utils";
import { DEFAULT_QUERY_OPTIONS } from "./config";
import { Domain, Key } from "../../types/common";
import { QueryEffectState, QueryOptions } from "../../types/modules/query";
import { EffectActionTypePatterns } from "../../types/action";
import { State } from "../../types/state";

/* --------- */

type GetQueryArgs = {
  effectActionTypePatterns: EffectActionTypePatterns;
  domain: Domain;
};

type QueryFnArgs<T = unknown> = {
  key: Key;
  fn: () => Promise<T> | T;
  options: QueryOptions;
};

export const getQuery = ({ effectActionTypePatterns, domain }: GetQueryArgs) =>
  function* query<T>({ key, fn, options }: QueryFnArgs<T>) {
    const createdKey = createKey(key);

    try {
      const { useCache } = {
        ...DEFAULT_QUERY_OPTIONS,
        ...(options || {}),
      };

      const isValid: boolean = yield select(
        (state: State<QueryEffectState>) => {
          return state?.[domain]?.[createdKey]?.isValid;
        },
      );
      const isAlreadyInProgress: boolean = yield select(
        (state: State<QueryEffectState>) => {
          const stateNode = state?.[domain]?.[createdKey];
          return stateNode?.isLoading || stateNode?.isFetching;
        },
      );
      if ((useCache && isValid) || isAlreadyInProgress) {
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
