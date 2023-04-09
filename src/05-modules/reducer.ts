import {
  Action,
  MutationEffectState,
  QueryEffectState,
  State,
} from "../01-types/general";
import { isObject } from "../03-utilities/general";
import { EffectActionTypePatterns } from "../04-helpers/general";
import {
  createMutationEffectFailureState,
  createMutationEffectRequestState,
  createMutationEffectSuccessState,
} from "../04-helpers/mutation";
import {
  createQueryEffectFailureState,
  createQueryEffectInvalidateState,
  createQueryEffectRequestState,
  createQueryEffectSuccessState,
} from "../04-helpers/query";

export const getReducer = (
  effectActionTypePatterns: EffectActionTypePatterns,
) => {
  return function reducer(state: State, action?: Action): State {
    const { type, payload } = action || {};

    if (typeof type === "string" && typeof payload?.createdKey === "string") {
      /* * * * 
        Query 
       * * * */

      const queryState = (isObject(state?.[payload.createdKey]) ||
        {}) as QueryEffectState;

      if (type.includes(effectActionTypePatterns.query.request)) {
        return {
          ...state,
          [payload.createdKey]: createQueryEffectRequestState(queryState),
        };
      }

      if (type.includes(effectActionTypePatterns.query.success)) {
        return {
          ...state,
          [payload.createdKey]: createQueryEffectSuccessState(payload?.data),
        };
      }

      if (type.includes(effectActionTypePatterns.query.failure)) {
        return {
          ...state,
          [payload.createdKey]: createQueryEffectFailureState(queryState),
        };
      }

      if (type.includes(effectActionTypePatterns.query.invalidate)) {
        return {
          ...state,
          [payload.createdKey]: createQueryEffectInvalidateState(queryState),
        };
      }

      /* * * * * * 
        Mutation 
       * * * * * */

      const mutationState = (state?.[payload.createdKey] ||
        {}) as MutationEffectState;

      if (type.includes(effectActionTypePatterns.mutation.request)) {
        return {
          ...state,
          [payload.createdKey]: createMutationEffectRequestState(mutationState),
        };
      }

      if (type.includes(effectActionTypePatterns.mutation.success)) {
        return {
          ...state,
          [payload.createdKey]: createMutationEffectSuccessState(payload.data),
        };
      }

      if (type.includes(effectActionTypePatterns.mutation.failure)) {
        return {
          ...state,
          [payload.createdKey]: createMutationEffectFailureState(mutationState),
        };
      }

      /* * * * * 
        Common 
       * * * * */

      if (
        type.includes(effectActionTypePatterns.query.reset) ||
        type.includes(effectActionTypePatterns.mutation.reset)
      ) {
        const stateShallowCopy = { ...state };
        if (payload.createdKey in stateShallowCopy) {
          delete stateShallowCopy[payload.createdKey];
          return stateShallowCopy;
        }
      }
    }

    return state;
  };
};
