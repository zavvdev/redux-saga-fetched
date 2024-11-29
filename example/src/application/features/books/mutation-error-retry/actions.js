import { createAction } from "@reduxjs/toolkit";

export var orderFirstBookErrorAction = createAction(
  "books-mutation-error-retry/order-first",
  ({ email }) => ({
    payload: {
      email,
    },
  }),
);
