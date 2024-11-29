import { takeLeading, call } from "redux-saga/effects";
import { BooksApi } from "../../../../infrastructure/api/book-api";
import { fetchBooksAction } from "./actions";
import { query } from "../../../store/api";

function* fetchBooks() {
  var books = yield call(query, {
    key: ["books-query"],
    fn: () => BooksApi.getAll(),
  });

  if (
    books.find((book) => book.author_fullname === "Robert Martin")
  ) {
    console.log("Uncle Bob is here!");
  }
}

export function* booksMiddleware() {
  // Since query can be cancelled due to inProgress status or staleTime,
  // use takeLeading to wait for the previous query to finish before starting a new one
  yield takeLeading(fetchBooksAction.type, fetchBooks);
}
