import { call, put, select } from "redux-saga/effects";
import { Either as E } from "utilities";
import { Key } from "../entities/Key";
import { number } from "../validators";
import {
  createAction,
  createActionType,
  selectData,
  selectIsInProgress,
  withRetry,
} from "./_helpers";

export var selectIsValid =
  (domain, key, createTimestamp, staleTime) =>
  (state = {}) => {
    var data = state?.[domain]?.[key] || {};
    var timestamp = data?.timestamp;

    if (!timestamp || E.isLeft(number(timestamp))) {
      return false;
    }

    return createTimestamp() - timestamp < staleTime;
  };

function* executor({
  fn,
  action,
  actionType,
  patterns,
  createTimestamp,
  extractError,
  retry,
  retryDelay,
}) {
  try {
    yield put(action({ type: actionType(patterns.query.request) }));

    var data = yield call(withRetry, fn, retry, retryDelay);
    var nextTimestamp = createTimestamp();

    yield put(
      action({
        type: actionType(patterns.query.success),
        data,
        timestamp: nextTimestamp,
      }),
    );

    return data;
  } catch (e) {
    var e_ = extractError(e);

    yield put(
      action({
        type: actionType(patterns.query.failure),
        error: e_,
      }),
    );

    throw e_;
  }
}

var getQuery = ({
  domain,
  actionTypePatterns: patterns,
  initOptions,
  createTimestamp,
}) => {
  return function* ({ key, fn, options }) {
    var options_ = initOptions.merge({
      staleTime: options?.staleTime,
      extractError: options?.extractError,
      retry: options?.retry,
      retryDelay: options?.retryDelay,
    });

    var key_ = Key.from(key);

    var actionType = createActionType(key_);
    var action = createAction(key_);
    var stateSelector = () => selectData(domain, key_);

    var isInProgress = yield select(selectIsInProgress(domain, key_));

    var isValid = yield select(
      selectIsValid(
        domain,
        key_,
        createTimestamp,
        options_.staleTime,
      ),
    );

    if (isInProgress || isValid) {
      return yield select(stateSelector());
    }

    return yield call(executor, {
      fn,
      action,
      actionType,
      patterns,
      createTimestamp,
      extractError: options_.extractError,
      retry: options_.retry,
      retryDelay: options_.retryDelay,
    });
  };
};

export { getQuery };
