import { call, put, select } from "redux-saga/effects";
import { Key } from "../entities/Key";
import {
  createAction,
  createActionType,
  selectData,
  selectIsInProgress,
} from "./_helpers";

function* executor({
  fn,
  action,
  actionType,
  patterns,
  extractError,
}) {
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
    var e_ = extractError(e);

    yield put(
      action({
        type: actionType(patterns.mutation.failure),
        error: e_,
      }),
    );

    throw e_;
  }
}

var getMutation = ({ actionTypePatterns: patterns, initOptions }) => {
  return function* ({ key, fn, options }) {
    var options_ = initOptions.merge({
      extractError: options?.extractError,
    });

    var key_ = Key.from(key);

    var actionType = createActionType(key_);
    var action = createAction(key_);
    var stateSelector = () => selectData(options_.domain, key_);

    var isInProgress = yield select(
      selectIsInProgress(options_.domain, key_),
    );

    if (isInProgress) {
      return yield select(stateSelector());
    }

    return yield call(executor, {
      fn,
      action,
      actionType,
      patterns,
      extractError: options_.extractError,
    });
  };
};

export { getMutation };
