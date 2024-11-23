import { call, put, select } from "redux-saga/effects";
import { pipe, Either as E } from "utilities";
import { Key } from "../entities/Key";
import { createAction, createActionType } from "../helpers";
import { queryStates } from "./reducer";
import { number } from "../validators";

export var selectIsInProgress =
  (domain, key) =>
  (state = {}) => {
    var data = state?.[domain]?.[key] || {};
    return Boolean(data.isLoading || data.isFetching);
  };

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

export var selectData =
  (domain, key) =>
  (state = {}) => {
    return state?.[domain]?.[key] || queryStates.reset()();
  };

var getQuery = ({
  actionTypePatterns: patterns,
  initOptions,
  createTimestamp,
}) => {
  return function* ({ key, fn, options }) {
    var options_ = initOptions.merge({
      staleTime: options.staleTime,
    });

    var key_ = Key.from(key);

    var actionType = createActionType(key_);
    var action = createAction(key_);

    try {
      var isInProgress = yield select(
        selectIsInProgress(options_.domain, key_),
      );

      var isValid = yield select(
        selectIsValid(
          options_.domain,
          key_,
          createTimestamp,
          options_.staleTime,
        ),
      );

      if (isInProgress || isValid) {
        return yield select(selectData(options_.domain, key_));
      }

      yield put(pipe(patterns.query.request, actionType, action));

      var data = yield call(fn);
      var nextTimestamp = createTimestamp();

      yield put(
        action(
          actionType(patterns.query.success),
          data,
          nextTimestamp,
        ),
      );

      return queryStates.success()({
        data,
        timestamp: nextTimestamp,
      });
    } catch (e) {
      yield put(pipe(patterns.query.failure, actionType, action));
      throw e;
    }
  };
};

export { getQuery };
