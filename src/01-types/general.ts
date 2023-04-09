export type Domain = string;
export type InstanceId = string;

export type QueryOptions = {
  staleTime: number;
  cacheTime: number;
};

export type InitOptions = {
  domain: Domain;
  query?: Partial<QueryOptions>;
};

export enum Effect {
  query = "query",
  mutation = "mutation",
}

export enum ActionType {
  request = "request",
  success = "success",
  failure = "failure",
  invalidate = "invalidate",
  reset = "reset",
}

export type ActionTypePattern<A extends ActionType> =
  `${Domain}@${A}#${InstanceId}`;
