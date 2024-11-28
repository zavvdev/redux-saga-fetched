import { selector } from "../../store/api";

export var selectBooks = (state) => {
  var books = selector(["books"])(state)?.data || [];

  return books.map((book) => ({
    id: book.id,
    author: book.author_fullname,
    title: book.title,
    price: book.price,
  }));
};

export var selectIsBooksLoading = (state) => {
  var state_ = selector(["books"])(state);
  return state_?.isLoading ?? false;
};

export var selectIsBooksFetching = (state) => {
  var state_ = selector(["books"])(state);
  return state_?.isFetching ?? false;
};
