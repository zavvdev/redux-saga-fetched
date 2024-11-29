# redux-saga-query

[![npm version]](https://www.npmjs.com/package/redux-saga-query)

`redux-saga-query` is a library that aims to make api state management easier providing an abstraction around basic redux/redux-saga flow when working with data fetching.

You might have written code that uses redux and redux-saga to implement data fetching with REQUEST, SUCCESS, FAILURE actions for each api request. This package abstracts away these actions and also provides predefined redux store records for storing and caching requested data.

All you need to do now, is to instantiate redux-saga-query and use functions that it provides: _reducer_ - that you just need to connect to your store and it will manage data, _query_ - for requesting data that needs to be cached, _mutation_ - for requesting data without caching, and more.

The main idea is that you can request your data from anywhere in your sagas and not to worry about managing it's state.
