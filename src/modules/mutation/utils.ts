import { MutationEffectState } from "../../types/modules/mutation";
import { CreatedKey, DataStatus, Effect } from "../../types/common";
import { StateNode } from "../../types/state";

/* -------- */

export function createMutationEffectState<T>({
  isLoading,
  isLoaded,
  isError,
  status,
  data,
}: Omit<MutationEffectState<T>, "type">): MutationEffectState<T> {
  return {
    type: Effect.Mutation,
    isLoading,
    isLoaded,
    isError,
    status,
    data,
  };
}

/* -------- */

export const createMutationEffectResetState = () =>
  createMutationEffectState({
    isLoading: false,
    isLoaded: false,
    isError: false,
    status: DataStatus.Reset,
    data: null,
  });

/* -------- */

type CreateMutationEffectRequestStateArgs = {
  state: StateNode<MutationEffectState>;
  payload: {
    createdKey: CreatedKey;
  };
};

export const createMutationEffectRequestState = ({
  state,
  payload,
}: CreateMutationEffectRequestStateArgs) =>
  createMutationEffectState({
    isLoading: true,
    isLoaded: false,
    isError: false,
    status: DataStatus.Loading,
    data: state[payload.createdKey]?.data || null,
  });

/* -------- */

type CreateMutationEffectSuccessStateArgs<T> = {
  payload: {
    data: T | null;
  };
};

export function createMutationEffectSuccessState<T>({
  payload,
}: CreateMutationEffectSuccessStateArgs<T>) {
  return createMutationEffectState<T>({
    isLoading: false,
    isLoaded: true,
    isError: false,
    status: DataStatus.Loaded,
    data: payload.data,
  });
}

/* -------- */

type CreateMutationEffectFailureStateArgs = {
  state: StateNode<MutationEffectState>;
  payload: {
    createdKey: CreatedKey;
  };
};

export const createMutationEffectFailureState = ({
  state,
  payload,
}: CreateMutationEffectFailureStateArgs) =>
  createMutationEffectState({
    isLoading: false,
    isLoaded: false,
    isError: true,
    status: DataStatus.Error,
    data: state[payload.createdKey]?.data || null,
  });

/* -------- */
