import { all, call, put, select } from "redux-saga/effects";
import { createActionType, createKey } from "../../utils";
import { getInvalidate } from "../invalidate";
import { Domain, Key } from "../../types/common";
import {
  MutationEffectState,
  MutationOptions,
} from "../../types/modules/mutation";
import { EffectActionTypePatterns } from "../../types/action";
import { State } from "../../types/state";

type GetMutationArgs = {
  effectActionTypePatterns: EffectActionTypePatterns;
  domain: Domain;
};

type MutationFnArgs<T = unknown> = {
  key: Key;
  fn: () => Promise<T> | T;
  options: MutationOptions;
};

export const getMutation = ({
  effectActionTypePatterns,
  domain,
}: GetMutationArgs) =>
  function* mutation<T>({ key, fn, options }: MutationFnArgs<T>) {
    const invalidate = getInvalidate({ effectActionTypePatterns, domain });
    const createdKey = createKey(key);
    const keysToInvalidateOnSuccess = options?.invalidateKeysOnSuccess || [];
    try {
      const isKeyDataPresent: boolean = yield select(
        (state: State<MutationEffectState>) => {
          return !!state?.[domain]?.[createdKey];
        },
      );
      if (isKeyDataPresent) {
        const isAlreadyInProgress: boolean = yield select(
          (state: State<MutationEffectState>) => {
            return state[domain][createdKey]?.isLoading;
          },
        );
        if (isAlreadyInProgress) {
          return;
        }
        yield put({
          type: createActionType({
            createdKey,
            effectActionTypePattern: effectActionTypePatterns.mutation.request,
          }),
          payload: {
            createdKey,
          },
        });
        const data: T = yield call(fn);
        yield put({
          type: createActionType({
            createdKey,
            effectActionTypePattern: effectActionTypePatterns.mutation.success,
          }),
          payload: {
            data,
            createdKey,
          },
        });
        if (
          Array.isArray(keysToInvalidateOnSuccess) &&
          keysToInvalidateOnSuccess.length > 0
        ) {
          yield all(
            keysToInvalidateOnSuccess.map((keyToInvalidate) =>
              call(invalidate, keyToInvalidate),
            ),
          );
        }
      }
    } catch (e) {
      yield put({
        type: createActionType({
          createdKey,
          effectActionTypePattern: effectActionTypePatterns.mutation.failure,
        }),
        payload: {
          createdKey,
        },
      });
      throw e;
    }
  };
