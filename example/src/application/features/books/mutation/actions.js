import { createAction } from "@reduxjs/toolkit";

export var orderFirstBookAction = createAction(
  "books-mutation/order-first",
  ({ email }) => ({
    payload: {
      email,
    },
  }),
);
