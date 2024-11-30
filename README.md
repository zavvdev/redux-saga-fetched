# redux-saga-query

This library aims to make api state management easier providing an abstraction around basic redux/redux-saga flow when working with data fetching.

You might have written code that uses redux and redux-saga to implement data fetching with REQUEST, SUCCESS, FAILURE actions for each api request. This package abstracts away these actions and also provides predefined redux store records for storing and caching requested data.

All you need to do now, is to instantiate redux-saga-query and use functions that it provides: _reducer_ - that you just need to connect to your store and it will manage data, _query_ - for requesting data that needs to be cached, _mutation_ - for requesting data without caching, and more.

The main idea is that you can request your data from anywhere in your sagas and not to worry about managing it's state.

This package has only one dependency - [redux-saga](https://github.com/redux-saga/redux-sag) which needs to be installed in your project.

# Gettings started

## Install

```sh
$ npm install redux-saga-query
```

or

```sh
$ yarn add redux-saga-query
```

or

```sh
$ pnpm add redux-saga-query
```

## Usage Example

Suppose you have a redux in your project. It can be vanilla redux or [redux-toolkit](https://redux-toolkit.js.org/), doesn't matter. It can be even custom I/O environment like redux, since redux-saga [allows you to do that](https://redux-saga.js.org/docs/advanced/UsingRunSaga).

Since you have storage, you have some data that needs to be derived from some place, for example, from some API. This package gives you an `initSagaQuery` function which needs to be called ones per domain. Domain is like a record in store that will be responsible for managing its data.

```
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
```

Then you need to connect `apiReducer` to your redux store:

```
import { apiReducer } from "./api";

export var rootReducer = {
  [apiReducer.name]: apiReducer.reducer,
};
```

Now you ready to use other functions provided by `initSagaQuery` in your application.

```
function* fetchBooks() {
  var books = yield call(query, {
    key: ["books-query"],
    fn: () => BooksApi.getAll(),
  });

  if (
    books.find((book) => book.author_fullname === "Robert Martin")
  ) {
    console.log("Uncle Bob is here!");
  }
}
```

Here we used `query` function to retrieve a list of books from external api. Under the hood this function dispatches `REQUEST` action if data is stale, makes a new call using your function, caches the result to storage and returns it back where you called it. If data is not stale, it doesn't make new request and returns back cached data from storage. More information in Documentation and [Example](https://github.com/zavvdev/redux-saga-query/tree/main/example).
