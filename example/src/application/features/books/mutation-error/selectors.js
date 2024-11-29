import { selector } from "../../../store/api";

export var selectIsFirstBookOrdering = (state) => {
  var state_ = selector(["first-book-order-error"])(state);
  return state_?.isLoading ?? false;
};
