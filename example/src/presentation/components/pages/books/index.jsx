import { useEffect } from "react";
import { connect } from "react-redux";
import {
  selectBooks,
  selectIsBooksLoading,
} from "../../../../application/features/books/selectors";
import { fetchBooksAction } from "../../../../application/features/books/actions";

var mapStateToProps = (state) => ({
  books: selectBooks(state),
  isBooksLoading: selectIsBooksLoading(state),
});

var mapDispatchToProps = (dispatch) => ({
  fetchBooks: () => dispatch(fetchBooksAction()),
});

export var Books = connect(
  mapStateToProps,
  mapDispatchToProps,
)(({ books, isBooksLoading, fetchBooks }) => {
  useEffect(() => {
    fetchBooks();
  }, []);

  if (isBooksLoading) {
    return <div>Loading...</div>;
  }

  return <div>{JSON.stringify(books, null, 2)}</div>;
});
