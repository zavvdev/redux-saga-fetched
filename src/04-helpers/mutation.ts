import { MutationEffectState } from "../01-types/general";
import { createMutationEffectState } from "../03-utilities/general";

export const createMutationEffectRequestState = (
  state: Partial<MutationEffectState>,
) => {
  return createMutationEffectState({
    isLoading: true,
    isSuccess: false,
    isError: false,
    data: state?.data || null,
  });
};

export const createMutationEffectSuccessState = (data: unknown) => {
  return createMutationEffectState({
    isLoading: false,
    isSuccess: true,
    isError: false,
    data: data || null,
  });
};

export const createMutationEffectFailureState = (
  state: Partial<MutationEffectState>,
) => {
  return createMutationEffectState({
    isLoading: false,
    isSuccess: false,
    isError: true,
    data: state?.data || null,
  });
};
