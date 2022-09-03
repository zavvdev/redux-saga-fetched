import { DATA_STATUS_TYPES, EFFECT_TYPES } from "config";

export const createQueryState = ({
  isLoading,
  isFetching,
  isLoaded,
  isError,
  isValid,
  status,
  data,
}) => ({
  type: EFFECT_TYPES.query,
  isLoading,
  isFetching,
  isLoaded,
  isError,
  isValid,
  status,
  data,
});

export const createQueryResetState = () => createQueryState({
  isLoading: false,
  isFetching: false,
  isLoaded: false,
  isError: false,
  isValid: false,
  status: DATA_STATUS_TYPES.reset,
  data: null,
});

export const createQueryRequestState = ({ state, payload }) => {
  const isLoading = !state[payload.createdKey]?.data;
  const isFetching = !!state[payload.createdKey]?.data;
  return createQueryState({
    isLoading,
    isFetching,
    isLoaded: false,
    isError: false,
    isValid: false,
    status: isLoading ? DATA_STATUS_TYPES.loading : DATA_STATUS_TYPES.fetching,
    data: state[payload.createdKey]?.data || null,
  });
};

export const createQuerySuccessState = ({ payload }) => createQueryState({
  isLoading: false,
  isFetching: false,
  isLoaded: true,
  isError: false,
  isValid: true,
  status: DATA_STATUS_TYPES.loaded,
  data: payload.data,
});

export const createQueryFailureState = (
  { state, payload },
) => createQueryState({
  isLoading: false,
  isFetching: false,
  isLoaded: false,
  isError: true,
  isValid: false,
  status: DATA_STATUS_TYPES.error,
  data: state[payload.createdKey]?.data || null,
});

export const createQueryInvalidateState = (
  { state, payload },
) => createQueryState({
  isLoading: state[payload.createdKey]?.isLoading,
  isFetching: state[payload.createdKey]?.isFetching,
  isLoaded: state[payload.createdKey]?.isLoaded,
  isError: state[payload.createdKey]?.isError,
  isValid: false,
  status: state[payload.createdKey]?.status,
  data: state[payload.createdKey]?.data,
});