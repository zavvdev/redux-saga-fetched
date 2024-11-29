import { takeLeading, call } from "redux-saga/effects";
import { BooksApi } from "../../../../infrastructure/api/book-api";
import { fetchBooksAction } from "./actions";
import { query } from "../../../store/api";

function* fetchBooks() {
  try {
    yield call(query, {
      key: ["books-query-error"],
      fn: () => BooksApi.getAll(true),
    });
  } catch (e) {
    console.log("fetchBooks error:", e);
  }
}

export function* booksErrorMiddleware() {
  // Since query can be cancelled due to inProgress status or staleTime,
  // use takeLeading to wait for the previous query to finish before starting a new one
  yield takeLeading(fetchBooksAction.type, fetchBooks);
}
