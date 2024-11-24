import { selector } from "../../store/api";

export var selectBooks = (state) =>
  selector(["books"])(state)?.data || [];

export var selectIsBooksLoading = (state) => {
  var state_ = selector(["books"])(state);
  return state_?.isLoading || false;
};
