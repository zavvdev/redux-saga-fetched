import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./rootSaga";
import { rootReducer } from "./rootReducer";

var sagaMiddleware = createSagaMiddleware();

var store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export { store };
