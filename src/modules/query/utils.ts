import { StateNode } from "../../types/state";
import { CreatedKey, DataStatus, Effect } from "../../types/common";
import { QueryEffectState } from "../../types/modules/query";

/* -------- */

export function createQueryEffectState<T>({
  isLoading,
  isFetching,
  isLoaded,
  isError,
  isValid,
  status,
  data,
}: Omit<QueryEffectState<T>, "type">): QueryEffectState<T> {
  return {
    type: Effect.Query,
    isLoading,
    isFetching,
    isLoaded,
    isError,
    isValid,
    status,
    data,
  };
}

/* -------- */

export const createQueryEffectResetState = () =>
  createQueryEffectState({
    isLoading: false,
    isFetching: false,
    isLoaded: false,
    isError: false,
    isValid: false,
    status: DataStatus.Reset,
    data: null,
  });

/* -------- */

type CreateQueryEffectRequestStateArgs = {
  state: StateNode<QueryEffectState>;
  payload: {
    createdKey: CreatedKey;
  }
}

export const createQueryEffectRequestState = (
  { state, payload }: CreateQueryEffectRequestStateArgs,
) => {
  const isLoading = !state[payload.createdKey]?.data;
  const isFetching = !!state[payload.createdKey]?.data;
  return createQueryEffectState({
    isLoading,
    isFetching,
    isLoaded: false,
    isError: false,
    isValid: false,
    status: isLoading ? DataStatus.Loading : DataStatus.Fetching,
    data: state[payload.createdKey]?.data || null,
  });
};

/* -------- */

type CreateQueryEffectSuccessStateArgs<T> = {
  payload: {
    data: T | null
  }
}

export function createQueryEffectSuccessState<T>(
  { payload }: CreateQueryEffectSuccessStateArgs<T>,
) {
  return createQueryEffectState<T>({
    isLoading: false,
    isFetching: false,
    isLoaded: true,
    isError: false,
    isValid: true,
    status: DataStatus.Loaded,
    data: payload.data,
  });
}

/* -------- */

type CreateQueryEffectFailureStateArgs = {
  state: StateNode<QueryEffectState>;
  payload: {
    createdKey: CreatedKey;
  }
}

export const createQueryEffectFailureState = (
  { state, payload }: CreateQueryEffectFailureStateArgs,
) =>
  createQueryEffectState({
    isLoading: false,
    isFetching: false,
    isLoaded: false,
    isError: true,
    isValid: false,
    status: DataStatus.Error,
    data: state[payload.createdKey]?.data || null,
  });

/* -------- */

type CreateQueryEffectInvalidateStateArgs = {
  state: StateNode<QueryEffectState>;
  payload: {
    createdKey: CreatedKey;
  }
}

export const createQueryEffectInvalidateState = (
  { state, payload }: CreateQueryEffectInvalidateStateArgs,
) =>
  createQueryEffectState({
    isLoading: state[payload.createdKey]?.isLoading,
    isFetching: state[payload.createdKey]?.isFetching,
    isLoaded: state[payload.createdKey]?.isLoaded,
    isError: state[payload.createdKey]?.isError,
    isValid: false,
    status: state[payload.createdKey]?.status,
    data: state[payload.createdKey]?.data,
  });

/* -------- */