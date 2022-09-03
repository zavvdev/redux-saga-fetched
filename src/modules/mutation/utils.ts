import { DATA_STATUS_TYPES, EFFECT_TYPES } from "config";
import { MutationState } from "modules/mutation/types";

export function createMutationState<T>({
  isLoading,
  isLoaded,
  isError,
  status,
  data,
}: MutationState<T>) {
  return {
    type: EFFECT_TYPES.mutation,
    isLoading,
    isLoaded,
    isError,
    status,
    data,
  };
}

export const createMutationResetState = () =>
  createMutationState({
    isLoading: false,
    isLoaded: false,
    isError: false,
    status: DATA_STATUS_TYPES.reset,
    data: null,
  });

export const createMutationRequestState = ({ state, payload }) =>
  createMutationState({
    isLoading: true,
    isLoaded: false,
    isError: false,
    status: DATA_STATUS_TYPES.loading,
    data: state[payload.createdKey]?.data || null,
  });

export const createMutationSuccessState = ({ payload }) =>
  createMutationState({
    isLoading: false,
    isLoaded: true,
    isError: false,
    status: DATA_STATUS_TYPES.loaded,
    data: payload.data,
  });

export const createMutationFailureState = ({ state, payload }) =>
  createMutationState({
    isLoading: false,
    isLoaded: false,
    isError: true,
    status: DATA_STATUS_TYPES.error,
    data: state[payload.createdKey]?.data || null,
  });
