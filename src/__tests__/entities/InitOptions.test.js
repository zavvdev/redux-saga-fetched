import { test, describe } from "vitest";
import { InitOptions } from "../../entities/InitOptions";
import { expect } from "vitest";

test("should create InitOptions entity", () => {
  var extractError = (e) => e.response.data;

  expect(
    InitOptions.from({
      domain: "api",
      staleTime: 1000,
      extractError,
    }),
  ).toStrictEqual(new InitOptions("api", 1000, extractError));
});

test("should throw error if domain is not a string", () => {
  expect(() => {
    InitOptions.from({
      domain: 1,
      staleTime: 1000,
    });
  }).toThrow("Expected a string");
});

test("should throw error if staleTime is not a number", () => {
  expect(() => {
    InitOptions.from({
      domain: "api",
      staleTime: "1000",
    });
  }).toThrow("Expected a number");
});

test("should throw error if extractError is not a function", () => {
  expect(() => {
    InitOptions.from({
      domain: "api",
      staleTime: "1000",
      extractError: "error",
    });
  }).toThrow("Expected a function");
});

describe("merge", () => {
  test("should merge domain", () => {
    var initOptions = InitOptions.from({
      domain: "api",
      staleTime: 1000,
    });

    var nextOptions = {
      domain: "api2",
    };

    expect(initOptions.merge(nextOptions)).toStrictEqual(
      InitOptions.from({
        domain: "api2",
        staleTime: 1000,
      }),
    );
  });

  test("should merge staleTime", () => {
    var initOptions = InitOptions.from({
      domain: "api",
      staleTime: 1000,
    });

    var nextOptions = {
      staleTime: 2000,
    };

    expect(initOptions.merge(nextOptions)).toStrictEqual(
      InitOptions.from({
        domain: "api",
        staleTime: 2000,
      }),
    );
  });

  test("should merge extractError", () => {
    var initOptions = InitOptions.from({
      domain: "api",
      staleTime: 1000,
      extractError: (e) => e.name,
    });

    var nextOptions = {
      domain: "api2",
      staleTime: 2000,
      extractError: (e) => e.response.data,
    };

    expect(initOptions.merge(nextOptions)).toStrictEqual(
      InitOptions.from(nextOptions),
    );
  });

  test("should not merge domain if it's not a string", () => {
    var initOptions = InitOptions.from({
      domain: "api",
      staleTime: 1000,
    });

    var nextOptions = {
      domain: null,
      staleTime: 1000,
    };

    expect(initOptions.merge(nextOptions)).toStrictEqual(
      InitOptions.from({
        domain: "api",
        staleTime: 1000,
      }),
    );
  });

  test("should not merge staleTime if it's not a number", () => {
    var initOptions = InitOptions.from({
      domain: "api",
      staleTime: 1000,
    });

    var nextOptions = {
      domain: "api2",
      staleTime: null,
    };

    expect(initOptions.merge(nextOptions)).toStrictEqual(
      InitOptions.from({
        domain: "api2",
        staleTime: 1000,
      }),
    );
  });

  test("should not merge extractError if it's not a function", () => {
    var extractError = (e) => e.name;

    var initOptions = InitOptions.from({
      domain: "api",
      staleTime: 1000,
      extractError,
    });

    var nextOptions = {
      domain: "api2",
      staleTime: 1000,
      extractError: "error",
    };

    expect(initOptions.merge(nextOptions)).toStrictEqual(
      InitOptions.from({
        domain: "api2",
        staleTime: 1000,
        extractError,
      }),
    );
  });
});
