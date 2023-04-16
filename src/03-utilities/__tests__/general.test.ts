import { describe, it, expect } from "vitest";
import {
  composeActionType,
  composeActionTypePattern,
  createInitOptions,
  createKey,
  createMutationEffectState,
  createQueryEffectState,
  genInstanceId,
  genTimestamp,
  isObject,
} from "../general";
import {
  ActionKind,
  Effect,
  InitOptions,
  QueryOptions,
} from "../../01-types/general";
import { DEFAULT_STALE_TIME_MS, MESSAGES } from "../../02-config/general";

describe("createInitOptions", () => {
  it("should throw error for invalid domain option", () => {
    expect(() => createInitOptions({} as InitOptions)).toThrowError(
      MESSAGES.error.domainIsString,
    );
  });

  it("should return default options", () => {
    expect(createInitOptions({ domain: "api" })).toStrictEqual({
      domain: "api",
      query: {
        staleTime: DEFAULT_STALE_TIME_MS,
      },
    } satisfies InitOptions);
  });

  it("should return custom options", () => {
    const customQueryOptions: QueryOptions = {
      staleTime: 3 * 60 * 1000,
    };
    expect(
      createInitOptions({
        domain: "api",
        query: customQueryOptions,
      }),
    ).toStrictEqual({
      domain: "api",
      query: customQueryOptions,
    } satisfies InitOptions);
  });
});

describe("genInstanceId", () => {
  it("should return string id", () => {
    expect(typeof genInstanceId()).toBe("string");
  });
});

describe("composeActionTypePattern", () => {
  it("should compose action type pattern", () => {
    const domain = "testDomain";
    const effect = Effect.Query;
    const actionKind = ActionKind.Request;
    const id = "testId";
    const pattern = composeActionTypePattern(domain, effect, actionKind, id);
    expect(pattern).toBe(`${effect}_${actionKind}#${domain}${id}`);
  });
});

describe("createQueryEffectState", () => {
  it("should create query effect state", () => {
    const args = {
      isLoading: true,
      isFetching: false,
      isSuccess: false,
      isError: false,
      timestamp: 42424242,
      data: { age: 23 },
    };
    expect(createQueryEffectState(args)).toEqual({
      type: Effect.Query,
      ...args,
    });
  });
});

describe("createMutationEffectState", () => {
  it("should create mutation effect state", () => {
    const args = {
      isLoading: true,
      isSuccess: false,
      isError: false,
      data: { age: 23 },
    };
    expect(createMutationEffectState(args)).toEqual({
      type: Effect.Mutation,
      ...args,
    });
  });
});

describe("isObject", () => {
  it("should return true", () => {
    expect(isObject({})).toBe(true);
  });

  it("should return false", () => {
    expect(isObject(null)).toBe(false);
    expect(isObject("")).toBe(false);
    expect(isObject(42)).toBe(false);
  });
});

describe("genTimestamp", () => {
  it("should generate numeric timestamp", () => {
    expect(typeof genTimestamp()).toBe("number");
  });
});

describe("createKey", () => {
  it("should create key", () => {
    expect(createKey([4, "2"])).toBe("4-2");
  });
});

describe("composeActionType", () => {
  it("should compose action type", () => {
    const key = "4-2";
    const pattern = "query_request#api424242";
    expect(composeActionType(key, pattern)).toBe(`${key}_${pattern}`);
  });
});
