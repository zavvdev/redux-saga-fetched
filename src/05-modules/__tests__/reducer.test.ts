import { describe, expect, it, vi } from "vitest";
import { EffectActionTypePatterns } from "../../04-helpers/general";
import { ActionKind, Effect } from "../../01-types/general";
import {
  composeActionType,
  composeActionTypePattern,
  genInstanceId,
} from "../../03-utilities/general";
import { getReducer } from "../reducer";
import { MutationEffectState } from "../../01-types/general";
import { QueryEffectState } from "../../01-types/general";

const domain = "domainTest";
const instanceId = genInstanceId();

const effectActionTypePatterns = {
  [Effect.Query]: {
    [ActionKind.Request]: composeActionTypePattern(
      domain,
      Effect.Query,
      ActionKind.Request,
      instanceId,
    ),
    [ActionKind.Success]: composeActionTypePattern(
      domain,
      Effect.Query,
      ActionKind.Success,
      instanceId,
    ),
    [ActionKind.Failure]: composeActionTypePattern(
      domain,
      Effect.Query,
      ActionKind.Failure,
      instanceId,
    ),
    [ActionKind.Invalidate]: composeActionTypePattern(
      domain,
      Effect.Query,
      ActionKind.Invalidate,
      instanceId,
    ),
    [ActionKind.Reset]: composeActionTypePattern(
      domain,
      Effect.Query,
      ActionKind.Reset,
      instanceId,
    ),
  },
  [Effect.Mutation]: {
    [ActionKind.Request]: composeActionTypePattern(
      domain,
      Effect.Mutation,
      ActionKind.Request,
      instanceId,
    ),
    [ActionKind.Success]: composeActionTypePattern(
      domain,
      Effect.Mutation,
      ActionKind.Success,
      instanceId,
    ),
    [ActionKind.Failure]: composeActionTypePattern(
      domain,
      Effect.Mutation,
      ActionKind.Failure,
      instanceId,
    ),
    [ActionKind.Reset]: composeActionTypePattern(
      domain,
      Effect.Mutation,
      ActionKind.Reset,
      instanceId,
    ),
  },
} satisfies EffectActionTypePatterns;

const reducer = getReducer(effectActionTypePatterns);
const createdKey = "4242";

const actionTypes = {
  query: {
    request: composeActionType(
      createdKey,
      effectActionTypePatterns.query.request,
    ),
    success: composeActionType(
      createdKey,
      effectActionTypePatterns.query.success,
    ),
    failure: composeActionType(
      createdKey,
      effectActionTypePatterns.query.failure,
    ),
    invalidate: composeActionType(
      createdKey,
      effectActionTypePatterns.query.invalidate,
    ),
    reset: composeActionType(createdKey, effectActionTypePatterns.query.reset),
  },
  mutation: {
    request: composeActionType(
      createdKey,
      effectActionTypePatterns.mutation.request,
    ),
    success: composeActionType(
      createdKey,
      effectActionTypePatterns.mutation.success,
    ),
    failure: composeActionType(
      createdKey,
      effectActionTypePatterns.mutation.failure,
    ),
    reset: composeActionType(
      createdKey,
      effectActionTypePatterns.mutation.reset,
    ),
  },
};

it("should return previous state", () => {
  const state = { age: 23 } as any;
  expect(reducer(state, { type: "actionTest" } as any)).toEqual(state);
});

// Query

describe("query request action", () => {
  it("should add fresh key data ", () => {
    expect(
      reducer(
        {},
        {
          type: actionTypes.query.request,
          payload: {
            createdKey: createdKey,
          },
        },
      ),
    ).toEqual({
      [createdKey]: {
        type: Effect.Query,
        isLoading: true,
        isFetching: false,
        isSuccess: false,
        isError: false,
        timestamp: null,
        data: null,
      },
    });
  });

  it("should update previous key data ", () => {
    const keyData = {
      type: Effect.Query,
      isLoading: false,
      isFetching: false,
      isSuccess: false,
      isError: false,
      timestamp: 424242,
      data: 123,
    } satisfies QueryEffectState;

    expect(
      reducer(
        {
          [createdKey]: keyData,
        },
        {
          type: actionTypes.query.request,
          payload: {
            createdKey: createdKey,
          },
        },
      ),
    ).toEqual({
      [createdKey]: {
        ...keyData,
        isFetching: true,
      },
    });
  });
});

describe("query success action", () => {
  it("should update key data with payload data", () => {
    vi.mock("../../03-utilities/general", async () => {
      const general: Record<string, unknown> = await vi.importActual(
        "../../03-utilities/general",
      );
      return {
        ...general,
        genTimestamp: () => 424242,
      };
    });

    const data = 123;

    expect(
      reducer(
        {},
        {
          type: actionTypes.query.success,
          payload: {
            createdKey: createdKey,
            data,
          },
        },
      ),
    ).toEqual({
      [createdKey]: {
        type: Effect.Query,
        isLoading: false,
        isFetching: false,
        isSuccess: true,
        isError: false,
        timestamp: 424242,
        data,
      },
    });

    vi.doUnmock("../../03-utilities/general");
  });

  it("should update key data without payload data", () => {
    vi.mock("../../03-utilities/general", async () => {
      const general: Record<string, unknown> = await vi.importActual(
        "../../03-utilities/general",
      );
      return {
        ...general,
        genTimestamp: () => 424242,
      };
    });

    expect(
      reducer(
        {},
        {
          type: actionTypes.query.success,
          payload: {
            createdKey: createdKey,
          },
        },
      ),
    ).toEqual({
      [createdKey]: {
        type: Effect.Query,
        isLoading: false,
        isFetching: false,
        isSuccess: true,
        isError: false,
        timestamp: 424242,
        data: null,
      },
    });

    vi.doUnmock("../../03-utilities/general");
  });
});

describe("query failure action", () => {
  it("should add fresh key data", () => {
    expect(
      reducer(
        {},
        {
          type: actionTypes.query.failure,
          payload: {
            createdKey: createdKey,
          },
        },
      ),
    ).toEqual({
      [createdKey]: {
        type: Effect.Query,
        isLoading: false,
        isFetching: false,
        isSuccess: false,
        isError: true,
        timestamp: null,
        data: null,
      },
    });
  });

  it("should update previous key data ", () => {
    const keyData = {
      type: Effect.Query,
      isLoading: false,
      isFetching: false,
      isSuccess: false,
      isError: false,
      timestamp: 424242,
      data: 123,
    } satisfies QueryEffectState;

    expect(
      reducer(
        {
          [createdKey]: keyData,
        },
        {
          type: actionTypes.query.failure,
          payload: {
            createdKey: createdKey,
          },
        },
      ),
    ).toEqual({
      [createdKey]: {
        ...keyData,
        isError: true,
        timestamp: null,
      },
    });
  });
});

describe("query invalidate action", () => {
  it("should add fresh key data", () => {
    expect(
      reducer(
        {},
        {
          type: actionTypes.query.invalidate,
          payload: {
            createdKey: createdKey,
          },
        },
      ),
    ).toEqual({
      [createdKey]: {
        type: Effect.Query,
        isLoading: false,
        isFetching: false,
        isSuccess: false,
        isError: false,
        timestamp: null,
        data: null,
      },
    });
  });

  it("should update previous key data ", () => {
    const keyData = {
      type: Effect.Query,
      isLoading: false,
      isFetching: false,
      isSuccess: false,
      isError: false,
      timestamp: 424242,
      data: 123,
    } satisfies QueryEffectState;

    expect(
      reducer(
        {
          [createdKey]: keyData,
        },
        {
          type: actionTypes.query.invalidate,
          payload: {
            createdKey: createdKey,
          },
        },
      ),
    ).toEqual({
      [createdKey]: {
        ...keyData,
        timestamp: null,
      },
    });
  });
});

describe("query reset action", () => {
  it("should remove key", () => {
    expect(
      reducer(
        {
          [createdKey]: {
            type: Effect.Query,
            isLoading: false,
            isFetching: false,
            isSuccess: false,
            isError: false,
            timestamp: 424242,
            data: 123,
          },
        },
        {
          type: actionTypes.query.reset,
          payload: {
            createdKey: createdKey,
          },
        },
      ),
    ).toEqual({});
  });
});

// Mutation

describe("mutation request action", () => {
  it("should add fresh key data ", () => {
    expect(
      reducer(
        {},
        {
          type: actionTypes.mutation.request,
          payload: {
            createdKey: createdKey,
          },
        },
      ),
    ).toEqual({
      [createdKey]: {
        type: Effect.Mutation,
        isLoading: true,
        isSuccess: false,
        isError: false,
        data: null,
      },
    });
  });

  it("should update previous key data ", () => {
    const keyData = {
      type: Effect.Mutation,
      isLoading: false,
      isSuccess: false,
      isError: false,
      data: 123,
    } satisfies MutationEffectState;

    expect(
      reducer(
        {
          [createdKey]: keyData,
        },
        {
          type: actionTypes.mutation.request,
          payload: {
            createdKey: createdKey,
          },
        },
      ),
    ).toEqual({
      [createdKey]: {
        ...keyData,
        isLoading: true,
        data: keyData.data,
      },
    });
  });
});

describe("mutation success action", () => {
  it("should update key data with payload data", () => {
    expect(
      reducer(
        {},
        {
          type: actionTypes.mutation.success,
          payload: {
            createdKey: createdKey,
            data: 123,
          },
        },
      ),
    ).toEqual({
      [createdKey]: {
        type: Effect.Mutation,
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: 123,
      },
    });
  });

  it("should update key data without payload data", () => {
    expect(
      reducer(
        {},
        {
          type: actionTypes.mutation.success,
          payload: {
            createdKey: createdKey,
          },
        },
      ),
    ).toEqual({
      [createdKey]: {
        type: Effect.Mutation,
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: null,
      },
    });
  });
});

describe("mutation failure action", () => {
  it("should add fresh key data", () => {
    expect(
      reducer(
        {},
        {
          type: actionTypes.mutation.failure,
          payload: {
            createdKey: createdKey,
          },
        },
      ),
    ).toEqual({
      [createdKey]: {
        type: Effect.Mutation,
        isLoading: false,
        isSuccess: false,
        isError: true,
        data: null,
      },
    });
  });

  it("should update previous key data ", () => {
    const keyData = {
      type: Effect.Mutation,
      isLoading: false,
      isSuccess: false,
      isError: true,
      data: 123,
    } satisfies MutationEffectState;

    expect(
      reducer(
        {
          [createdKey]: keyData,
        },
        {
          type: actionTypes.mutation.failure,
          payload: {
            createdKey: createdKey,
          },
        },
      ),
    ).toEqual({
      [createdKey]: {
        ...keyData,
        isError: true,
      },
    });
  });
});

describe("mutation reset action", () => {
  it("should remove key", () => {
    expect(
      reducer(
        {
          [createdKey]: {
            type: Effect.Mutation,
            isLoading: false,
            isSuccess: false,
            isError: false,
            data: 123,
          },
        },
        {
          type: actionTypes.mutation.reset,
          payload: {
            createdKey: createdKey,
          },
        },
      ),
    ).toEqual({});
  });
});
