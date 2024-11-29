import { takeLeading, call } from "redux-saga/effects";
import { BooksApi } from "../../../../infrastructure/api/book-api";
import { mutation, query } from "../../../store/api";
import { orderFirstBookAction } from "./actions";

function* orderFirstBook(action) {
  var books = yield call(query, {
    key: ["books-query"],
    fn: () => BooksApi.getAll(),
  });

  var firstBook = books?.[0];

  if (firstBook) {
    var order = yield call(mutation, {
      key: ["first-book-order"],
      fn: () =>
        BooksApi.order({
          book_ids: [firstBook.id],
          order_email: action.payload.email,
        }),
    });

    window.alert(
      `Successful Order: ${JSON.stringify(order, null, 2)}`,
    );
  } else {
    window.alert("No books found");
  }
}

export function* orderBooksMiddleware() {
  // Since query can be cancelled due to inProgress status,
  // use takeLeading to wait for the previous query to finish before starting a new one
  yield takeLeading(orderFirstBookAction.type, orderFirstBook);
}
