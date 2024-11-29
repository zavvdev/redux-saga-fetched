import { connect } from "react-redux";
import { Button } from "../../../atoms/button";
import { selectIsFirstBookOrdering } from "../../../../../application/features/books/mutation/selectors";
import { orderFirstBookAction } from "../../../../../application/features/books/mutation/actions";
import { useState } from "react";
import { Input } from "../../../atoms/input";
import { selectIsBooksFetching } from "../../../../../application/features/books/query/selectors";

var mapStateToProps = (state) => ({
  isFirstBookOrdering: selectIsFirstBookOrdering(state),
  isBooksLoading: selectIsBooksFetching(state),
});

var mapDispatchToProps = (dispatch) => ({
  orderFirstBook: ({ email }) =>
    dispatch(orderFirstBookAction({ email })),
});

export var Mutation = connect(
  mapStateToProps,
  mapDispatchToProps,
)(({ isFirstBookOrdering, isBooksLoading, orderFirstBook }) => {
  var [email, setEmail] = useState("zavvdev@mutation.com");

  return (
    <div>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="block mb-2"
      />
      <Button
        simple
        onClick={() => {
          if (email) {
            orderFirstBook({ email });
          }
        }}
        className="mb-2"
        disabled={isFirstBookOrdering || isBooksLoading}
      >
        Order First Book
      </Button>
      <div className="flex flex-col gap-2">
        {isBooksLoading && <div>Loading books...</div>}
        {isFirstBookOrdering && <div>Ordering...</div>}
      </div>
    </div>
  );
});
