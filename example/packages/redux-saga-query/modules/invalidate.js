import { put, select } from "redux-saga/effects";
import { Key } from "../entities/Key";
import {
  createAction,
  createActionType,
  selectKeyState,
  selectMatchedKeys,
} from "./_helpers";

var getInvalidate = ({ actionTypePatterns: patterns, domain }) => {
  return function* ({ key }) {
    var key_ = Key.from(key);
    var keysToInvalidate = yield select(
      selectMatchedKeys(key_, domain),
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
