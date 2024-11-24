import { takeLatest, call } from "redux-saga/effects";
import { BooksApi } from "../../../infrastructure/api/book-api";
import { fetchBooksAction } from "./actions";
import { query } from "../../store/api";

function* fetchBooks() {
  yield call(query, { key: ["books"], fn: () => BooksApi.getAll() });
}

export function* booksMiddleware() {
  yield takeLatest(fetchBooksAction.type, fetchBooks);
}
