import { init } from "../../index";
import {
  createMutationEffectFailureState,
  createMutationEffectRequestState,
  createMutationEffectResetState,
  createMutationEffectSuccessState,
} from "../../modules/mutation/utils";
import {
  createQueryEffectFailureState,
  createQueryEffectInvalidateState,
  createQueryEffectRequestState,
  createQueryEffectResetState,
  createQueryEffectSuccessState,
} from "../../modules/query/utils";
import {
  createAction,
  createActionWithoutData,
} from "../../modules/reducer/utils";
import { Domain } from "../../types/common";
import { MutationEffectState } from "../../types/modules/mutation";
import { QueryEffectState } from "../../types/modules/query";
import { StateNode } from "../../types/state";
import { createKey } from "../../utils";

describe("reducer", () => {
  const domain: Domain = "domainMock";
  const key = ["mock", "key"];
  const createdKey = createKey(key);
  const state = {} as StateNode;

  const {
    reducer,
    createQueryActionTypeFromKey,
    createMutationActionTypeFromKey,
  } = init({
    domain,
  });

  test("should return empty state", () => {
    expect(reducer(state)).toBe(state);
  });

  // Query

  test("should return query request state", () => {
    const expectedState = {
      [createdKey]: createQueryEffectRequestState({
        state: state as StateNode<QueryEffectState>,
        payload: {
          createdKey,
        },
      }),
    };
    const action = createActionWithoutData({
      type: createQueryActionTypeFromKey(key, "request"),
      createdKey,
    });
    expect(reducer(state, action)).toStrictEqual(expectedState);
  });

  test("should return query success state", () => {
    const expectedState = {
      [createdKey]: createQueryEffectSuccessState({
        payload: {
          data: 123,
        },
      }),
    };
    const action = createAction<number>({
      type: createQueryActionTypeFromKey(key, "success"),
      createdKey,
      data: 123,
    });
    expect(reducer(state, action)).toStrictEqual(expectedState);
  });

  test("should return query failure state", () => {
    const expectedState = {
      [createdKey]: createQueryEffectFailureState({
        state: state as StateNode<QueryEffectState>,
        payload: {
          createdKey,
        },
      }),
    };
    const action = createActionWithoutData({
      type: createQueryActionTypeFromKey(key, "failure"),
      createdKey,
    });
    expect(reducer(state, action)).toStrictEqual(expectedState);
  });

  test("should return query invalidate state", () => {
    const expectedState = {
      [createdKey]: createQueryEffectInvalidateState({
        state: state as StateNode<QueryEffectState>,
        payload: {
          createdKey,
        },
      }),
    };
    const action = createActionWithoutData({
      type: createQueryActionTypeFromKey(key, "invalidate"),
      createdKey,
    });
    expect(reducer(state, action)).toStrictEqual(expectedState);
  });

  test("should return query reset state", () => {
    const expectedState = {
      [createdKey]: createQueryEffectResetState(),
    };
    const action = createActionWithoutData({
      type: createQueryActionTypeFromKey(key, "reset"),
      createdKey,
    });
    expect(reducer(state, action)).toStrictEqual(expectedState);
  });

  // Mutation

  test("should return mutation request state", () => {
    const expectedState = {
      [createdKey]: createMutationEffectRequestState({
        state: state as StateNode<MutationEffectState>,
        payload: {
          createdKey,
        },
      }),
    };
    const action = createActionWithoutData({
      type: createMutationActionTypeFromKey(key, "request"),
      createdKey,
    });
    expect(reducer(state, action)).toStrictEqual(expectedState);
  });

  test("should return mutation success state", () => {
    const expectedState = {
      [createdKey]: createMutationEffectSuccessState({
        payload: {
          data: 123,
        },
      }),
    };
    const action = createAction({
      type: createMutationActionTypeFromKey(key, "success"),
      createdKey,
      data: 123,
    });
    expect(reducer(state, action)).toStrictEqual(expectedState);
  });

  test("should return mutation failure state", () => {
    const expectedState = {
      [createdKey]: createMutationEffectFailureState({
        state: state as StateNode<MutationEffectState>,
        payload: {
          createdKey,
        },
      }),
    };
    const action = createActionWithoutData({
      type: createMutationActionTypeFromKey(key, "failure"),
      createdKey,
    });
    expect(reducer(state, action)).toStrictEqual(expectedState);
  });

  test("should return mutation reset state", () => {
    const expectedState = {
      [createdKey]: createMutationEffectResetState(),
    };
    const action = createActionWithoutData({
      type: createMutationActionTypeFromKey(key, "reset"),
      createdKey,
    });
    expect(reducer(state, action)).toStrictEqual(expectedState);
  });
});
