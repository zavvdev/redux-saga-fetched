import { initSagaQuery } from "redux-saga-query";

var DOMAIN = "api";

var { reducer, query, mutation, selector } = initSagaQuery({
  domain: DOMAIN,
  query: {
    staleTime: 1000 * 60,
  },
});

var apiReducer = {
  name: DOMAIN,
  reducer,
};

export { apiReducer, query, mutation, selector };
