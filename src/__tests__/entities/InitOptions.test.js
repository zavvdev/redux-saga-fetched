import { test, describe } from "vitest";
import {
  MutationOptions,
  QueryOptions,
} from "../../entities/InitOptions";
import { expect } from "vitest";

var extractError = (e) => e.response.data;

describe("QueryOptions", () => {
  test("should create an instance", () => {
    expect(
      QueryOptions.from({
        staleTime: 1000,
        extractError,
        retry: 2,
        retryDelay: 1000,
      }),
    ).toStrictEqual(new QueryOptions(1000, extractError, 2, 1000));
  });

  test("should create an instance with default retryDelay", () => {
    expect(
      QueryOptions.from({
        staleTime: 1000,
        extractError,
        retry: 2,
      }),
    ).toStrictEqual(new QueryOptions(1000, extractError, 2));
  });

  test("should throw an error if staleTime is not a number", () => {
    expect(() => {
      QueryOptions.from({
        staleTime: "1000",
        extractError,
        retry: 2,
      });
    }).toThrow("Expected a number");
  });

  test("should throw an error if extractError is not a function", () => {
    expect(() => {
      QueryOptions.from({
        staleTime: 1000,
        extractError: "error",
        retry: 2,
      });
    }).toThrow("Expected a function");
  });

  test("should throw an error if retry is not a number", () => {
    expect(() => {
      QueryOptions.from({
        staleTime: 1000,
        extractError,
        retry: "2",
      });
    }).toThrow("Expected a number");
  });

  test("should throw an error if retryDelay is not a number", () => {
    expect(() => {
      QueryOptions.from({
        staleTime: 1000,
        extractError,
        retry: 2,
        retryDelay: "1000",
      });
    }).toThrow("Expected a number");
  });

  describe("merge", () => {
    describe("staleTime", () => {
      test("should merge", () => {
        var initOptions = QueryOptions.from({
          staleTime: 1000,
          extractError,
          retry: 2,
        });

        var nextOptions = {
          staleTime: 2000,
        };

        expect(initOptions.merge(nextOptions)).toStrictEqual(
          QueryOptions.from({
            staleTime: 2000,
            extractError,
            retry: 2,
          }),
        );
      });

      test("should not merge if it's not a number", () => {
        var initOptions = QueryOptions.from({
          staleTime: 1000,
          extractError,
          retry: 2,
        });

        var nextOptions = {
          staleTime: null,
        };

        expect(initOptions.merge(nextOptions)).toStrictEqual(
          QueryOptions.from({
            staleTime: 1000,
            extractError,
            retry: 2,
          }),
        );
      });
    });

    describe("extractError", () => {
      test("should merge", () => {
        var initOptions = QueryOptions.from({
          staleTime: 1000,
          extractError,
          retry: 2,
        });

        var nextExtractError = (e) => e.response.data;

        var nextOptions = {
          extractError: nextExtractError,
        };

        expect(initOptions.merge(nextOptions)).toStrictEqual(
          QueryOptions.from({
            staleTime: 1000,
            extractError: nextExtractError,
            retry: 2,
          }),
        );
      });

      test("should not merge if it's not a function", () => {
        var initOptions = QueryOptions.from({
          staleTime: 1000,
          extractError,
          retry: 2,
        });

        var nextOptions = {
          extractError: "error",
        };

        expect(initOptions.merge(nextOptions)).toStrictEqual(
          QueryOptions.from({
            staleTime: 1000,
            extractError,
            retry: 2,
          }),
        );
      });
    });

    describe("retry", () => {
      test("should merge", () => {
        var initOptions = QueryOptions.from({
          staleTime: 1000,
          extractError,
          retry: 2,
        });

        var nextOptions = {
          retry: 4,
        };

        expect(initOptions.merge(nextOptions)).toStrictEqual(
          QueryOptions.from({
            staleTime: 1000,
            extractError,
            retry: 4,
          }),
        );
      });

      test("should not merge if it's not a number", () => {
        var initOptions = QueryOptions.from({
          staleTime: 1000,
          extractError,
          retry: 4,
        });

        var nextOptions = {
          retry: "2",
        };

        expect(initOptions.merge(nextOptions)).toStrictEqual(
          QueryOptions.from({
            staleTime: 1000,
            extractError,
            retry: 4,
          }),
        );
      });
    });

    describe("retryDelay", () => {
      test("should merge", () => {
        var initOptions = QueryOptions.from({
          staleTime: 1000,
          extractError,
          retry: 2,
        });

        var nextOptions = {
          retryDelay: 2000,
        };

        expect(initOptions.merge(nextOptions)).toStrictEqual(
          QueryOptions.from({
            staleTime: 1000,
            extractError,
            retry: 2,
            retryDelay: 2000,
          }),
        );
      });

      test("should not merge if it's not a number", () => {
        var initOptions = QueryOptions.from({
          staleTime: 1000,
          extractError,
          retry: 2,
          retryDelay: 2000,
        });

        var nextOptions = {
          retryDelay: "1000",
        };

        expect(initOptions.merge(nextOptions)).toStrictEqual(
          QueryOptions.from({
            staleTime: 1000,
            extractError,
            retry: 2,
            retryDelay: 2000,
          }),
        );
      });
    });
  });
});

describe("MutationOptions", () => {
  test("should create an instance", () => {
    expect(
      MutationOptions.from({
        extractError,
        retry: 2,
        retryDelay: 1000,
      }),
    ).toStrictEqual(new MutationOptions(extractError, 2, 1000));
  });

  test("should create an instance with default retryDelay", () => {
    expect(
      MutationOptions.from({
        extractError,
        retry: 2,
      }),
    ).toStrictEqual(new MutationOptions(extractError, 2));
  });

  test("should throw an error if extractError is not a function", () => {
    expect(() => {
      MutationOptions.from({
        extractError: "error",
        retry: 2,
      });
    }).toThrow("Expected a function");
  });

  test("should throw an error if retry is not a number", () => {
    expect(() => {
      MutationOptions.from({
        extractError,
        retry: "2",
      });
    }).toThrow("Expected a number");
  });

  test("should throw an error if retryDelay is not a number", () => {
    expect(() => {
      MutationOptions.from({
        extractError,
        retry: 2,
        retryDelay: "1000",
      });
    }).toThrow("Expected a number");
  });

  describe("merge", () => {
    describe("extractError", () => {
      test("should merge", () => {
        var initOptions = MutationOptions.from({
          extractError,
          retry: 2,
        });

        var nextExtractError = (e) => e.response.data;

        var nextOptions = {
          extractError: nextExtractError,
        };

        expect(initOptions.merge(nextOptions)).toStrictEqual(
          MutationOptions.from({
            extractError: nextExtractError,
            retry: 2,
          }),
        );
      });

      test("should not merge if it's not a function", () => {
        var initOptions = MutationOptions.from({
          extractError,
          retry: 2,
        });

        var nextOptions = {
          extractError: "error",
        };

        expect(initOptions.merge(nextOptions)).toStrictEqual(
          MutationOptions.from({
            extractError,
            retry: 2,
          }),
        );
      });
    });

    describe("retry", () => {
      test("should merge", () => {
        var initOptions = MutationOptions.from({
          extractError,
          retry: 2,
        });

        var nextOptions = {
          retry: 4,
        };

        expect(initOptions.merge(nextOptions)).toStrictEqual(
          MutationOptions.from({
            extractError,
            retry: 4,
          }),
        );
      });

      test("should not merge if it's not a number", () => {
        var initOptions = MutationOptions.from({
          extractError,
          retry: 4,
        });

        var nextOptions = {
          retry: "2",
        };

        expect(initOptions.merge(nextOptions)).toStrictEqual(
          MutationOptions.from({
            extractError,
            retry: 4,
          }),
        );
      });
    });

    describe("retryDelay", () => {
      test("should merge", () => {
        var initOptions = MutationOptions.from({
          extractError,
          retry: 2,
        });

        var nextOptions = {
          retryDelay: 2000,
        };

        expect(initOptions.merge(nextOptions)).toStrictEqual(
          MutationOptions.from({
            extractError,
            retry: 2,
            retryDelay: 2000,
          }),
        );
      });

      test("should not merge if it's not a number", () => {
        var initOptions = MutationOptions.from({
          extractError,
          retry: 2,
          retryDelay: 2000,
        });

        var nextOptions = {
          retryDelay: "1000",
        };

        expect(initOptions.merge(nextOptions)).toStrictEqual(
          MutationOptions.from({
            extractError,
            retry: 2,
            retryDelay: 2000,
          }),
        );
      });
    });
  });
});
