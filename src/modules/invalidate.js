import { put, select } from "redux-saga/effects";
import { Either as E, pipe } from "utilities";
import { Key } from "../entities/Key";
import { object } from "../validators";
import {
  createAction,
  createActionType,
  selectKeyState,
} from "./_helpers";

export var selectKeysForInvalidation =
  (key, domain) =>
  (state = {}) =>
    pipe(
      state?.[domain] || {},
      object,
      E.chain((x) => Object.keys(x).filter((k) => k.startsWith(key))),
      E.chainLeft(() => []),
    );

var getInvalidate = ({ actionTypePatterns: patterns, domain }) => {
  return function* ({ key }) {
    var key_ = Key.from(key);
    var keysToInvalidate = yield select(
      selectKeysForInvalidation(key_, domain),
    );

    for (let k of keysToInvalidate) {
      let keyState = yield select(selectKeyState(domain, k));
      let actionType = createActionType(k);
      let action = createAction(k);

      if (
        keyState.isValid &&
        !keyState.isLoading &&
        !keyState.isFetching
      ) {
        yield put(
          action({
            type: actionType(patterns.query.invalidate),
          }),
        );
      }
    }
  };
};

export { getInvalidate };
