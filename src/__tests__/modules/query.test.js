import { expect, test, describe } from "vitest";
import {
  selectData,
  selectIsInProgress,
  selectIsValid,
} from "../../modules/query";
import { queryStates } from "../../modules/reducer";

describe("selectIsInProgress", () => {
  test("should return true if isLoading is true", () => {
    var state = {
      domain: {
        key: {
          isLoading: true,
        },
      },
    };

    expect(selectIsInProgress("domain", "key")(state)).toBe(true);
  });

  test("should return true if isFetching is true", () => {
    var state = {
      domain: {
        key: {
          isFetching: true,
        },
      },
    };

    expect(selectIsInProgress("domain", "key")(state)).toBe(true);
  });

  test("should return false if isFetching and isLoading is false", () => {
    var state = {
      domain: {
        key: {
          isFetching: false,
          isLoading: false,
        },
      },
    };

    expect(selectIsInProgress("domain", "key")(state)).toBe(false);
  });

  test("should return false if isFetching and isLoading is missing", () => {
    var state = {
      domain: {
        key: {},
      },
    };

    expect(selectIsInProgress("domain", "key")(state)).toBe(false);
  });
});

describe("selectIsValid", () => {
  test("should return false if timestamp is missing", () => {
    var state = {
      domain: {
        key: {},
      },
    };

    expect(
      selectIsValid("domain", "key", () => 123, 1000)(state),
    ).toBe(false);
  });

  test("should return false if timestamp is not a number", () => {
    var state = {
      domain: {
        key: {
          timestamp: "123",
        },
      },
    };

    expect(
      selectIsValid("domain", "key", () => 123, 1000)(state),
    ).toBe(false);
  });

  test("should return false if stale time has passed", () => {
    var state = {
      domain: {
        key: {
          timestamp: 100,
        },
      },
    };

    expect(selectIsValid("domain", "key", () => 125, 24)(state)).toBe(
      false,
    );
  });

  test("should return true if stale time has not passed", () => {
    var state = {
      domain: {
        key: {
          timestamp: 100,
        },
      },
    };

    expect(selectIsValid("domain", "key", () => 125, 26)(state)).toBe(
      true,
    );
  });
});

describe("selectData", () => {
  test("should select data by key", () => {
    var state = {
      domain: {
        key: {
          data: "data",
        },
      },
    };

    expect(selectData("domain", "key")(state)).toEqual({
      data: "data",
    });
  });

  test("should return reset state if data is missing", () => {
    var state = {
      domain: {},
    };

    expect(selectData("domain", "key")(state)).toEqual(
      queryStates.reset()(),
    );
  });
});
