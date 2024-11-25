import { call, put, select, spawn } from "redux-saga/effects";
import { Key } from "../entities/Key";
import {
  createAction,
  createActionType,
  selectData,
  selectIsInProgress,
} from "./_helpers";

export function* executor({ fn, action, actionType, patterns }) {
  try {
    yield put(
      action({ type: actionType(patterns.mutation.request) }),
    );

    var data = yield call(fn);

    yield put(
      action({
        type: actionType(patterns.mutation.success),
        data,
      }),
    );

    return data;
  } catch (e) {
    yield put(
      action({
        type: actionType(patterns.mutation.failure),
        error: e,
      }),
    );

    throw e;
  }
}

var getMutation = ({ actionTypePatterns: patterns, domain }) => {
  return function* ({ key, fn }) {
    var key_ = Key.from(key);

    var actionType = createActionType(key_);
    var action = createAction(key_);
    var stateSelector = () => selectData(domain, key_);

    var isInProgress = yield select(selectIsInProgress(domain, key_));

    if (isInProgress) {
      return yield select(stateSelector());
    }

    yield spawn(executor, { fn, action, actionType, patterns });
  };
};

export { getMutation };
