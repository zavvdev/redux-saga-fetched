import { call, put, select } from "redux-saga/effects";
import { createActionType, createKey } from "../../utils";
import { Domain, Key } from "../../types/common";
import { QueryEffectState, QueryOptions } from "../../types/modules/query";
import { EffectActionTypePatterns } from "../../types/action";
import { State } from "../../types/state";
import { createAction, createActionWithoutData } from "../reducer/utils";

/* --------- */

type GetQueryArgs = {
  effectActionTypePatterns: EffectActionTypePatterns;
  domain: Domain;
  useCache?: boolean;
};

type QueryFnArgs<T = unknown> = {
  key: Key;
  fn: () => Promise<T> | T;
  options: QueryOptions;
};

export const getQuery = ({
  effectActionTypePatterns,
  domain,
  useCache,
}: GetQueryArgs) =>
  function* query<T>({ key, fn, options }: QueryFnArgs<T>) {
    const createdKey = createKey(key);
    try {
      const withCache = options?.useCache ?? useCache ?? true;
      const isKeyDataPresent: boolean = yield select(
        (state: State<QueryEffectState>) => {
          return !!state?.[domain]?.[createdKey];
        },
      );
      if (isKeyDataPresent) {
        const isValid: boolean = yield select(
          (state: State<QueryEffectState>) => {
            return state[domain][createdKey]?.isValid;
          },
        );
        const isAlreadyInProgress: boolean = yield select(
          (state: State<QueryEffectState>) => {
            const stateNode = state[domain][createdKey];
            return stateNode?.isLoading || stateNode?.isFetching;
          },
        );
        if ((withCache && isValid) || isAlreadyInProgress) {
          return;
        }
        yield put(
          createActionWithoutData({
            type: createActionType({
              createdKey,
              effectActionTypePattern: effectActionTypePatterns.query.request,
            }),
            createdKey,
          }),
        );
        const data: T = yield call(fn);
        yield put(
          createAction({
            type: createActionType({
              createdKey,
              effectActionTypePattern: effectActionTypePatterns.query.success,
            }),
            data,
            createdKey,
          }),
        );
      }
    } catch (e) {
      yield put(
        createActionWithoutData({
          type: createActionType({
            createdKey,
            effectActionTypePattern: effectActionTypePatterns.query.failure,
          }),
          createdKey,
        }),
      );
      throw e;
    }
  };
