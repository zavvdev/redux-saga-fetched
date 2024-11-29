import { selector } from "../../../store/api";

export var selectIsBooksLoading = (state) => {
  var state_ = selector(["books-query-error"])(state);
  return state_?.isLoading ?? false;
};

export var selectError = (state) => {
  var state_ = selector(["books-query-error"])(state);
  return state_?.error ?? null;
};
