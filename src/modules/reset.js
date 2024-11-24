import { put, select } from "redux-saga/effects";
import { Key } from "../entities/Key";
import {
  createAction,
  createActionType,
  selectKeyState,
  selectMatchedKeys,
} from "./_helpers";

var getReset = ({ actionTypePatterns: patterns, domain }) => {
  return function* ({ key }) {
    var key_ = Key.from(key);
    var keysToReset = yield select(selectMatchedKeys(key_, domain));

    for (let k of keysToReset) {
      let keyState = yield select(selectKeyState(domain, k));
      let actionType = createActionType(k);
      let action = createAction(k);

      if (!keyState.isReset) {
        yield put(
          action({
            type: actionType(patterns.query.reset),
          }),
        );
      }
    }
  };
};

export { getReset };
