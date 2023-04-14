import { DEFAULT_STALE_TIME_MS, MESSAGES } from "../02-config/general";
import {
  ActionKind,
  ActionTypePattern,
  Domain,
  Effect,
  InitOptions,
  InstanceId,
  MutationEffectState,
  QueryEffectState,
} from "../01-types/general";
import { v4 as uuid } from "uuid";

export function createInitOptions(options: InitOptions): Required<InitOptions> {
  if (typeof options.domain !== "string") {
    throw new Error(MESSAGES.error.domainIsString);
  }
  return {
    domain: options.domain,
    query: {
      staleTime: options.query?.staleTime || DEFAULT_STALE_TIME_MS,
    },
  };
}

export function genInstanceId(): InstanceId {
  return uuid();
}

export function composeActionTypePattern<
  E extends Effect,
  A extends ActionKind,
>(
  domain: Domain,
  effect: E,
  actionKind: A,
  id: InstanceId,
): ActionTypePattern<E, A> {
  return `${effect}_${actionKind}#${domain}${id}`;
}

export function createQueryEffectState<T>({
  isLoading,
  isFetching,
  isSuccess,
  isError,
  timestamp,
  data,
}: Omit<QueryEffectState<T>, "type">): QueryEffectState<T> {
  return {
    type: Effect.Query,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    timestamp,
    data,
  };
}

export function createMutationEffectState<T>({
  isLoading,
  isSuccess,
  isError,
  data,
}: Omit<MutationEffectState<T>, "type">): MutationEffectState<T> {
  return {
    type: Effect.Mutation,
    isLoading,
    isSuccess,
    isError,
    data,
  };
}

export function isObject(value: unknown) {
  return value !== null && typeof value === "object";
}

export function genTimestamp() {
  return Number(new Date());
}
