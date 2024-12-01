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

Here we used `query` function to retrieve a list of books from external api. Under the hood this function dispatches `REQUEST` action if data is stale, makes a new call using your function, caches the result to storage and returns it back where you called it. If data is not stale, it doesn't make new request and returns back cached data from storage. More information in [Documentation](https://github.com/zavvdev/redux-saga-query/tree/main?tab=readme-ov-file#documentation) and [Example](https://github.com/zavvdev/redux-saga-query/tree/main/example).

# Documentation

## API

### initSagaQuery

Use this function to initialize redux-saga-query. You should call it once per domain. Domain is responsible for storing cached data. It's just an object with keys that store you data. You can have one or multiple domains. For example, one common `api` domain.

**Arguments**

`domain`

- **Required**: Yes
- **Type**: String
- **Description**: Should be unique for each function call

`extractError`

- **Required**: No
- **Type**: Function
- **Description**: Accepts an error thrown by `fn` function of query or mutation and returns some value. Value returned by this function will be re-thrown and stored in domain storage, so it should be serializable. Applies for both queries and mutations
- **Default value**: Function that extracts a message from error or error name if message is missing. If both are missing - returns _"An error occurred"_ string

`retry`

- **Required**: No
- **Type**: Number
- **Description**: Amount of retries that should be done for query and mutation `fn` function in case it throws an error

`retryDelay`

- **Required**: No
- **Type**: Number
- **Description**: Amount of time in milliseconds that should pass until next retry will be executed it case `fn` function of query or mutation throws an error

`query`

- **Required**: Yes
- **Type**: Object
- **Description**: [Configuration](https://github.com/zavvdev/redux-saga-query/blob/3cc865dafe4194b1caccb39574e4a87c2ca18962/src/index.d.ts#L1) for queries

  `staleTime`

  - **Required**: Yes
  - **Type**: Number
  - **Description**: Amount of time in milliseconds that should pass, so query data can be considered as stale. If data is stale, it will be requested again next time when query gets executed

  `extractError`

  - **Required**: No
  - **Type**: Function
  - **Description**: Same as global, but applies only for queries
  - **Default value**: Same as global

  `retry`

  - **Required**: No
  - **Type**: Number
  - **Description**: Same as global, but applies only for queries
  - **Default value**: 3

  `retryDelay`

  - **Required**: No
  - **Type**: Number
  - **Description**: Same as global, but applies only for queries
  - **Default value**: Exponential backoff

`mutation`

- **Required**: No
- **Type**: Object
- **Description**: [Configuration](https://github.com/zavvdev/redux-saga-query/blob/3cc865dafe4194b1caccb39574e4a87c2ca18962/src/index.d.ts#L8) for mutations

  `extractError`

  - **Required**: No
  - **Type**: Function
  - **Description**: Same as global, but applies only for mutations
  - **Default value**: Same as global

  `retry`

  - **Required**: No
  - **Type**: Number
  - **Description**: Same as global, but applies only for mutations
  - **Default value**: 0

  `retryDelay`

  - **Required**: No
  - **Type**: Number
  - **Description**: Same as global, but applies only for mutations

`createInstanceId`

- **Required**: No
- **Type**: Function
- **Description**: Returns a string that is used as unique identifier for constructing action type patterns
- **Default value**: Function that returns a string with number counted for each created domain with _initSagaQuery_ function

### Key

- **Type**: [Array<string | number | bigint | boolean>](https://github.com/zavvdev/redux-saga-query/blob/3cc865dafe4194b1caccb39574e4a87c2ca18962/src/index.d.ts#L14)
- **Description**: Unique identifier for each query or mutation which used as part of dispatched action type by redux-saga-query

### QueryRecord

- **Type**: [Object](https://github.com/zavvdev/redux-saga-query/blob/3cc865dafe4194b1caccb39574e4a87c2ca18962/src/index.d.ts#L16)
- **Description**: Object in domain storage that represents query state. Consists of next fields:

`isLoading`

- **Type**: Boolean
- **Description**: Has value `true` if `fn` function of query is being requested for the first time

`isFetching`

- **Type**: Boolean
- **Description**: Has value `true` if `fn` function of query is being requested at any time

`isLoaded`

- **Type**: Boolean
- **Description**: Has value `true` if `fn` function of query has been successfully derived its data

`isError`

- **Type**: Boolean
- **Description**: Has value `true` if `fn` function of query has thrown an error or any error has been thrown during query execution

`isValid`

- **Type**: Boolean
- **Description**: Has value `true` if `fn` query data doesn't need to be requested again. In other words, it's not stale because `staleTime` milliseconds has not been passed yet. But keep in mind that this value won't be updated automatically if nothing is being requested yet using its query Key. For example, if you have data that is valid and you don't request it again after it has become invalid, this field will still show you that it's valid event if it's staleTime has already passed. The only way to update state and get fresh status of this field is to trigger request again somewhere

`isReset`

- **Type**: Boolean
- **Description**: Has value `true` if `fn` query data is in reset state. Technically, reset state is when you have no data but query record is present in domain state. Redux-saga-query does not make reset of your data. It can only be reset by you manually by calling `reset` function

`timestamp`

- **Type**: Number | Undefined
- **Description**: Has the last timestamp when `fn` function of query has been successfully derived its data

`data`

- **Type**: Unknown | Null
- **Description**: Data derived from `fn` function of query

`error`

- **Type**: Unknown | Null
- **Description**: Value returned by `extractError` function (default or custom)

### MutationRecord

- **Type**: [Object](https://github.com/zavvdev/redux-saga-query/blob/3cc865dafe4194b1caccb39574e4a87c2ca18962/src/index.d.ts#L28)
- **Description**: Object in domain storage that represents mutation state. Consists of next fields:

`isLoading`

- **Type**: Boolean
- **Description**: Has value `true` if `fn` function of mutation is being executed

`isLoaded`

- **Type**: Boolean
- **Description**: Has value `true` if `fn` function of mutation has been successfully derived its data

`isError`

- **Type**: Boolean
- **Description**: Has value `true` if `fn` function of mutation has thrown an error or any error has been thrown during mutation execution

`data`

- **Type**: Unknown | Null
- **Description**: Data derived from `fn` function of mutation

`error`

- **Type**: Unknown | Null
- **Description**: Value returned by `extractError` function (default or custom)
