import {
  createQueryEffectFailureState,
  createQueryEffectInvalidateState,
  createQueryEffectRequestState,
  createQueryEffectResetState,
  createQueryEffectSuccessState,
} from "modules/query/utils";
import {
  createMutationEffectFailureState,
  createMutationEffectRequestState,
  createMutationEffectResetState,
  createMutationEffectSuccessState,
} from "modules/mutation/utils";
import { State } from "types";
import { Action, GetReducerArgs } from "modules/reducer/types";
import { QueryEffectState } from "modules/query/types";
import { MutationEffectState } from "modules/mutation/types";

const defaultState = {};

const defaultAction = {
  type: null,
  payload: {
    createdKey: null,
    data: null,
  },
};

export const getReducer = ({ effectActionTypePatterns }: GetReducerArgs) => {
  return function reducer<T>(
    state: State = defaultState,
    action: Action<T> = defaultAction,
  ): State<QueryEffectState | MutationEffectState> {
    const { type, payload } = action;

    if (type && payload?.createdKey) {

      /* * * * 
        Query 
       * * * */

      if (type.includes(effectActionTypePatterns.query.request)) {
        return {
          ...state,
          [payload.createdKey]: createQueryEffectRequestState({
            state: state as State<QueryEffectState>,
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
              data: payload.data,
            },
          }),
        };
      }
      if (type.includes(effectActionTypePatterns.query.failure)) {
        return {
          ...state,
          [payload.createdKey]: createQueryEffectFailureState({
            state: state as State<QueryEffectState>,
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
            state: state as State<QueryEffectState>,
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
            state: state as State<MutationEffectState>,
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
              data: payload.data,
            },
          }),
        };
      }
      if (type.includes(effectActionTypePatterns.mutation.failure)) {
        return {
          ...state,
          [payload.createdKey]: createMutationEffectFailureState({
            state: state as State<MutationEffectState>,
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
