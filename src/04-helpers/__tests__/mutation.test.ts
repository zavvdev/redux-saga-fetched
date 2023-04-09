import { describe, it, expect } from "vitest";
import { Effect } from "../../01-types/general";
import {
  createMutationEffectFailureState,
  createMutationEffectRequestState,
  createMutationEffectSuccessState,
} from "../mutation";

describe("createMutationEffectRequestState", () => {
  it("should create mutation request state from empty state", () => {
    expect(createMutationEffectRequestState({})).toEqual({
      type: Effect.Mutation,
      isLoading: true,
      isSuccess: false,
      isError: false,
      data: null,
    });
  });

  it("should create mutation request state from existed state", () => {
    const data = { age: 23 };
    expect(
      createMutationEffectRequestState({
        data,
      }),
    ).toEqual({
      type: Effect.Mutation,
      isLoading: true,
      isSuccess: false,
      isError: false,
      data,
    });
  });
});

describe("createMutationEffectSuccessState", () => {
  it("should create mutation success state", () => {
    const data = { age: 23 };
    expect(createMutationEffectSuccessState(data)).toEqual({
      type: Effect.Mutation,
      isLoading: false,
      isSuccess: true,
      isError: false,
      data,
    });
  });
});

describe("createMutationEffectFailureState", () => {
  it("should create mutation failure state from existed one", () => {
    const data = { age: 23 };
    expect(createMutationEffectFailureState({ data })).toEqual({
      type: Effect.Mutation,
      isLoading: false,
      isSuccess: false,
      isError: true,
      data,
    });
  });

  it("should create mutation failure state from empty one", () => {
    expect(createMutationEffectFailureState({})).toEqual({
      type: Effect.Mutation,
      isLoading: false,
      isSuccess: false,
      isError: true,
      data: null,
    });
  });
});
