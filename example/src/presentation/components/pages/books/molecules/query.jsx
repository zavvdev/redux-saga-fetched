import { connect } from "react-redux";
import {
  selectBooks,
  selectIsBooksFetching,
  selectIsBooksLoading,
} from "../../../../../application/features/books/query/selectors";
import { fetchBooksAction } from "../../../../../application/features/books/query/actions";
import { Book } from "../atoms/book";
import { Button } from "../../../atoms/button";

var mapStateToProps = (state) => ({
  books: selectBooks(state),
  isBooksLoading: selectIsBooksLoading(state),
  isBooksFetching: selectIsBooksFetching(state),
});

var mapDispatchToProps = (dispatch) => ({
  fetchBooks: () => dispatch(fetchBooksAction()),
});

export var Query = connect(
  mapStateToProps,
  mapDispatchToProps,
)(({ books, isBooksLoading, isBooksFetching, fetchBooks }) => {
  return (
    <div>
      <Button
        simple
        onClick={fetchBooks}
        className="mb-2"
        disabled={isBooksFetching}
      >
        Get Books
      </Button>
      <div className="flex flex-col gap-2">
        {isBooksLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {isBooksFetching && <div>Fetching...</div>}
            {books.map((book) => (
              <Book
                key={book.id}
                title={book.title}
                author={book.author}
                price={book.price}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
});
