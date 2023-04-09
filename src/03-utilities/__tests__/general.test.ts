import { describe, it, expect } from "vitest";
import { createInitOptions } from "../general";
import { InitOptions, QueryOptions } from "../../01-types/general";
import {
  DEFAULT_CACHE_TIME_MS,
  DEFAULT_STALE_TIME_MS,
  MESSAGES,
} from "../../02-config/general";

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
        cacheTime: DEFAULT_CACHE_TIME_MS,
      },
    } satisfies InitOptions);
  });

  it("should return custom options", () => {
    const customQueryOptions: QueryOptions = {
      staleTime: 3 * 60 * 1000,
      cacheTime: 4 * 60 * 1000,
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
