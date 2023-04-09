import { describe, it, expect, vi } from "vitest";
import {
  createQueryEffectFailureState,
  createQueryEffectInvalidateState,
  createQueryEffectRequestState,
  createQueryEffectSuccessState,
} from "../query";
import { Effect } from "../../01-types/general";

describe("createQueryEffectRequestState", () => {
  it("should create query request state from empty state", () => {
    expect(createQueryEffectRequestState({})).toEqual({
      type: Effect.Query,
      isLoading: true,
      isFetching: false,
      isSuccess: false,
      isError: false,
      timestamp: null,
      data: null,
    });
  });

  it("should create query request state from existed state", () => {
    const timestamp = 424242;
    const data = { age: 23 };
    expect(
      createQueryEffectRequestState({
        timestamp,
        data,
      }),
    ).toEqual({
      type: Effect.Query,
      isLoading: false,
      isFetching: true,
      isSuccess: false,
      isError: false,
      timestamp,
      data,
    });
  });
});

describe("createQueryEffectSuccessState", () => {
  it("should create query success state", () => {
    const data = { age: 23 };
    const timestamp = 424242;

    vi.mock("../../03-utilities/general", async () => {
      const general: Record<string, unknown> = await vi.importActual(
        "../../03-utilities/general",
      );
      return {
        ...general,
        genTimestamp: () => 424242,
      };
    });

    expect(createQueryEffectSuccessState(data)).toEqual({
      type: Effect.Query,
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      isError: false,
      timestamp,
      data,
    });

    vi.doUnmock("../../03-utilities/general");
  });
});

describe("createQueryEffectFailureState", () => {
  it("should create query failure state from existed one", () => {
    const data = { age: 23 };
    expect(createQueryEffectFailureState({ data })).toEqual({
      type: Effect.Query,
      isLoading: false,
      isFetching: false,
      isSuccess: false,
      isError: true,
      timestamp: null,
      data,
    });
  });

  it("should create query failure state from empty one", () => {
    expect(createQueryEffectFailureState({})).toEqual({
      type: Effect.Query,
      isLoading: false,
      isFetching: false,
      isSuccess: false,
      isError: true,
      timestamp: null,
      data: null,
    });
  });
});

describe("createQueryEffectInvalidateState", () => {
  it("should create query invalidate state from existed one", () => {
    const state = {
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      isError: false,
      timestamp: 424242,
      data: { age: 23 },
    };
    expect(createQueryEffectInvalidateState(state)).toEqual({
      type: Effect.Query,
      ...state,
      timestamp: null,
    });
  });

  it("should create query invalidate state from empty one", () => {
    expect(createQueryEffectInvalidateState({})).toEqual({
      type: Effect.Query,
      isLoading: false,
      isFetching: false,
      isSuccess: false,
      isError: false,
      timestamp: null,
      data: null,
    });
  });
});
