import { takeLeading, call } from "redux-saga/effects";
import { BooksApi } from "../../../../infrastructure/api/book-api";
import { mutation, query } from "../../../store/api";
import { orderFirstBookErrorAction } from "./actions";

function* orderFirstBookWithError(action) {
  var books = yield call(query, {
    key: ["books-query"],
    fn: () => BooksApi.getAll(),
  });

  var firstBook = books?.[0];

  if (firstBook) {
    try {
      yield call(mutation, {
        key: ["first-book-order-error"],
        fn: () =>
          BooksApi.order(
            {
              book_ids: [firstBook.id],
              order_email: action.payload.email,
            },
            true,
          ),
      });
    } catch (error) {
      window.alert(`Error ordering book: ${error}`);
    }
  } else {
    window.alert("No books found");
  }
}

export function* orderBooksErrorMiddleware() {
  // Since query can be cancelled due to inProgress status,
  // use takeLeading to wait for the previous query to finish before starting a new one
  yield takeLeading(
    orderFirstBookErrorAction.type,
    orderFirstBookWithError,
  );
}
