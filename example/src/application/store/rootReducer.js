import { apiReducer } from "./api";

export var rootReducer = {
  [apiReducer.name]: apiReducer.reducer,
};
