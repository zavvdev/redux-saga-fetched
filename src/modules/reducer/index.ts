import {
  createQueryEffectFailureState,
  createQueryEffectInvalidateState,
  createQueryEffectRequestState,
  createQueryEffectResetState,
  createQueryEffectSuccessState,
} from "../query/utils";
import {
  createMutationEffectFailureState,
  createMutationEffectRequestState,
  createMutationEffectResetState,
  createMutationEffectSuccessState,
} from "../mutation/utils";
import { StateNode } from "../../types/state";
import {
  Action,
  ActionPayload,
  ActionWithoutData,
} from "../../types/modules/reducer";
import { QueryEffectState } from "../../types/modules/query";
import { MutationEffectState } from "../../types/modules/mutation";
import { EffectActionTypePatterns } from "../../types/action";

type GetReducerArgs = {
  effectActionTypePatterns: EffectActionTypePatterns;
};

export const getReducer = ({ effectActionTypePatterns }: GetReducerArgs) => {
  return function reducer<T = unknown>(
    state: StateNode = {},
    action?: Action<T> | ActionWithoutData,
  ): StateNode {
    const { type, payload } = action || {};

    if (type && payload?.createdKey) {
      /* * * * 
        Query 
       * * * */

      if (type.includes(effectActionTypePatterns.query.request)) {
        return {
          ...state,
          [payload.createdKey]: createQueryEffectRequestState({
            state: state as StateNode<QueryEffectState>,
            payload: {
              createdKey: payload.createdKey,
            },
          }),
        };
      }
      if (type.includes(effectActionTypePatterns.query.success)) {
        return {
          ...state,
          [payload.createdKey]: createQueryEffectSuccessState<T>({
            payload: {
              data: (payload as ActionPayload<T>)?.data,
            },
          }),
        };
      }
      if (type.includes(effectActionTypePatterns.query.failure)) {
        return {
          ...state,
          [payload.createdKey]: createQueryEffectFailureState({
            state: state as StateNode<QueryEffectState>,
            payload: {
              createdKey: payload.createdKey,
            },
          }),
        };
      }
      if (type.includes(effectActionTypePatterns.query.invalidate)) {
        return {
          ...state,
          [payload.createdKey]: createQueryEffectInvalidateState({
            state: state as StateNode<QueryEffectState>,
            payload: {
              createdKey: payload.createdKey,
            },
          }),
        };
      }
      if (type.includes(effectActionTypePatterns.query.reset)) {
        return {
          ...state,
          [payload.createdKey]: createQueryEffectResetState(),
        };
      }

      /* * * * * * 
        Mutation 
       * * * * * */

      if (type.includes(effectActionTypePatterns.mutation.request)) {
        return {
          ...state,
          [payload.createdKey]: createMutationEffectRequestState({
            state: state as StateNode<MutationEffectState>,
            payload: {
              createdKey: payload.createdKey,
            },
          }),
        };
      }
      if (type.includes(effectActionTypePatterns.mutation.success)) {
        return {
          ...state,
          [payload.createdKey]: createMutationEffectSuccessState<T>({
            payload: {
              data: (payload as ActionPayload<T>)?.data,
            },
          }),
        };
      }
      if (type.includes(effectActionTypePatterns.mutation.failure)) {
        return {
          ...state,
          [payload.createdKey]: createMutationEffectFailureState({
            state: state as StateNode<MutationEffectState>,
            payload: {
              createdKey: payload.createdKey,
            },
          }),
        };
      }
      if (type.includes(effectActionTypePatterns.mutation.reset)) {
        return {
          ...state,
          [payload.createdKey]: createMutationEffectResetState(),
        };
      }
    }
    return state;
  };
};
