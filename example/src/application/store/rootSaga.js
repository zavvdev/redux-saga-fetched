import { all, spawn, call } from "redux-saga/effects";
import { booksMiddleware } from "../features/books/query/middleware";

export function* rootSaga() {
  const sagas = [booksMiddleware];

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      }),
    ),
  );
}
