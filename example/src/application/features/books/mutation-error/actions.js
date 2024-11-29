import { createAction } from "@reduxjs/toolkit";

export var orderFirstBookErrorAction = createAction(
  "books-mutation-error/order-first",
  ({ email }) => ({
    payload: {
      email,
    },
  }),
);
