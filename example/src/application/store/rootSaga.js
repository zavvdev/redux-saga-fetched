import { all, spawn, call } from "redux-saga/effects";
import { booksMiddleware } from "../features/books/query/middleware";
import { booksErrorMiddleware } from "../features/books/query-error/middleware";
import { orderBooksMiddleware } from "../features/books/mutation/middleware";

export function* rootSaga() {
  const sagas = [
    booksMiddleware,
    booksErrorMiddleware,
    orderBooksMiddleware,
  ];

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
