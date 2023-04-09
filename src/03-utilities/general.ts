import {
  DEFAULT_CACHE_TIME_MS,
  DEFAULT_STALE_TIME_MS,
  MESSAGES,
} from "../02-config/general";
import {
  ActionType,
  ActionTypePattern,
  Domain,
  InitOptions,
  InstanceId,
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
      cacheTime: options.query?.cacheTime || DEFAULT_CACHE_TIME_MS,
    },
  };
}

export function genInstanceId(): InstanceId {
  return uuid();
}

export function composeActionTypePattern<A extends ActionType>(
  domain: Domain,
  actionType: A,
  id: string,
): ActionTypePattern<A> {
  return `${domain}@${actionType}#${id}`;
}
