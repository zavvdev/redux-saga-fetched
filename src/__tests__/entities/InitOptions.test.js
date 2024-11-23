import { test, describe } from "vitest";
import { InitOptions } from "../../entities/InitOptions";
import { expect } from "vitest";

test("should create InitOptions entity", () => {
  expect(
    InitOptions.from({
      domain: "api",
      staleTime: 1000,
    }),
  ).toStrictEqual(new InitOptions("api", 1000));
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

  test("should merge domain and staleTime", () => {
    var initOptions = InitOptions.from({
      domain: "api",
      staleTime: 1000,
    });

    var nextOptions = {
      domain: "api2",
      staleTime: 2000,
    };

    expect(initOptions.merge(nextOptions)).toStrictEqual(
      InitOptions.from({
        domain: "api2",
        staleTime: 2000,
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
});
