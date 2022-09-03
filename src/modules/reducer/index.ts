import {
  createQueryFailureState,
  createQueryInvalidateState,
  createQueryRequestState,
  createQueryResetState,
  createQuerySuccessState,
} from "../query/utils";
import {
  createMutationFailureState,
  createMutationRequestState,
  createMutationResetState,
  createMutationSuccessState,
} from "../mutation/utils";
import { EffectActionTypePatterns } from "../../utils";
import { CreatedKey, State } from "../../types";

interface GetReducerArgs {
  effectActionPatterns: EffectActionTypePatterns;
};

type Action = {
  type: string | null;
  payload: {
    createdKey: CreatedKey | null;
    data: unknown;
  };
};

const defaultState = {};

const defaultAction = {
  type: null,
  payload: {
    createdKey: null,
    data: null,
  },
};

export const getReducer = ({ effectActionPatterns }: GetReducerArgs) => {
  return function reducer(
    state: State = defaultState,
    action: Action = defaultAction,
  ) {
    const { type, payload } = action;

    // Query

    if (type && payload?.createdKey) {
      if (type.includes(effectActionPatterns.query.request)) {
        return {
          ...state,
          [payload.createdKey]: createQueryRequestState({ state, payload }),
        };
      }
      if (type.includes(effectActionPatterns.query.success)) {
        return {
          ...state,
          [payload.createdKey]: createQuerySuccessState({ payload }),
        };
      }
      if (type.includes(effectActionPatterns.query.failure)) {
        return {
          ...state,
          [payload.createdKey]: createQueryFailureState({ state, payload }),
        };
      }
      if (type.includes(effectActionPatterns.query.invalidate)) {
        return {
          ...state,
          [payload.createdKey]: createQueryInvalidateState({ state, payload }),
        };
      }
      if (type.includes(effectActionPatterns.query.reset)) {
        return {
          ...state,
          [payload.createdKey]: createQueryResetState(),
        };
      }

      // Mutation

      if (type.includes(effectActionPatterns.mutation.request)) {
        return {
          ...state,
          [payload.createdKey]: createMutationRequestState({ state, payload }),
        };
      }
      if (type.includes(effectActionPatterns.mutation.success)) {
        return {
          ...state,
          [payload.createdKey]: createMutationSuccessState({ payload }),
        };
      }
      if (type.includes(effectActionPatterns.mutation.failure)) {
        return {
          ...state,
          [payload.createdKey]: createMutationFailureState({ state, payload }),
        };
      }
      if (type.includes(effectActionPatterns.mutation.reset)) {
        return {
          ...state,
          [payload.createdKey]: createMutationResetState(),
        };
      }
    }
    return state;
  };
}