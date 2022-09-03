import {
  createQueryFailureState,
  createQueryInvalidateState,
  createQueryRequestState,
  createQueryResetState,
  createQuerySuccessState,
} from "modules/query/utils";
import {
  createMutationFailureState,
  createMutationRequestState,
  createMutationResetState,
  createMutationSuccessState,
} from "modules/mutation/utils";
import { State } from "types";
import { Action, GetReducerArgs } from "modules/reducer/types";

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
    action: Action = defaultAction
  ): State {
    const { type, payload } = action;

    if (type && payload?.createdKey) {
      // Query

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
};
