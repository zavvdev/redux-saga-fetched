import { call, put, select } from "redux-saga/effects";
import { Key } from "../entities/Key";
import {
  createAction,
  createActionType,
  selectData,
  selectIsInProgress,
  withRetry,
} from "./_helpers";

function* executor({
  fn,
  action,
  actionType,
  patterns,
  extractError,
  retry,
  retryDelay,
}) {
  try {
    yield put(
      action({ type: actionType(patterns.mutation.request) }),
    );

    var data = yield call(withRetry, fn, retry, retryDelay);

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

var getMutation = ({
  domain,
  actionTypePatterns: patterns,
  initOptions,
}) => {
  return function* ({ key, fn, options }) {
    var options_ = initOptions.merge({
      extractError: options?.extractError,
      retry: options?.retry,
      retryDelay: options?.retryDelay,
    });

    var key_ = Key.from(key);

    var actionType = createActionType(key_);
    var action = createAction(key_);
    var stateSelector = () => selectData(domain, key_);

    var isInProgress = yield select(selectIsInProgress(domain, key_));

    if (isInProgress) {
      return yield select(stateSelector());
    }

    return yield call(executor, {
      fn,
      action,
      actionType,
      patterns,
      extractError: options_.extractError,
      retry: options_.retry,
      retryDelay: options_.retryDelay,
    });
  };
};

export { getMutation };
