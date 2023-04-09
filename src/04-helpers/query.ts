import { QueryEffectState } from "../01-types/general";
import { createQueryEffectState, genTimestamp } from "../03-utilities/general";

export const createQueryEffectRequestState = (
  state: Partial<QueryEffectState>,
) => {
  const isLoading = !state?.data;
  const isFetching = !!state?.data;
  return createQueryEffectState({
    isLoading,
    isFetching,
    isSuccess: false,
    isError: false,
    timestamp: state?.timestamp || null,
    data: state?.data || null,
  });
};

export const createQueryEffectSuccessState = (data: unknown) => {
  return createQueryEffectState({
    isLoading: false,
    isFetching: false,
    isSuccess: true,
    isError: false,
    timestamp: genTimestamp(),
    data: data || null,
  });
};

export const createQueryEffectFailureState = (
  state: Partial<QueryEffectState>,
) => {
  return createQueryEffectState({
    isLoading: false,
    isFetching: false,
    isSuccess: false,
    isError: true,
    timestamp: null,
    data: state?.data || null,
  });
};

export const createQueryEffectInvalidateState = (
  state: Partial<QueryEffectState>,
) => {
  return createQueryEffectState({
    isLoading: Boolean(state?.isLoading),
    isFetching: Boolean(state?.isFetching),
    isSuccess: Boolean(state?.isSuccess),
    isError: Boolean(state?.isError),
    timestamp: null,
    data: state?.data || null,
  });
};
