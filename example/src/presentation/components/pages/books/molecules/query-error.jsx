import { connect } from "react-redux";
import {
  selectError,
  selectIsBooksLoading,
} from "../../../../../application/features/books/query-error/selectors";
import { fetchBooksErrorAction } from "../../../../../application/features/books/query-error/actions";
import { Button } from "../../../atoms/button";

var mapStateToProps = (state) => ({
  isBooksLoading: selectIsBooksLoading(state),
  error: selectError(state),
});

var mapDispatchToProps = (dispatch) => ({
  fetchBooks: () => dispatch(fetchBooksErrorAction()),
});

export var QueryError = connect(
  mapStateToProps,
  mapDispatchToProps,
)(({ isBooksLoading, fetchBooks, error }) => {
  return (
    <div>
      <Button
        simple
        onClick={fetchBooks}
        className="mb-2"
        disabled={isBooksLoading}
      >
        Get Books With Error (retry 1)
      </Button>
      <div className="flex flex-col gap-2">
        {isBooksLoading ? (
          <div>Loading...</div>
        ) : (
          !!error && <div>Error: {JSON.stringify(error)}</div>
        )}
      </div>
    </div>
  );
});
