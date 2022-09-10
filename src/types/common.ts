export type Domain = string;
export type Key = string[];
export type CreatedKey = string;

export enum Effect {
  Query = "query",
  Mutation = "mutation",
}

export enum ActionTypeKind {
  Request = "request",
  Success = "success",
  Failure = "failure",
  Invalidate = "invalidate",
  Reset = "reset",
}

export type EffectActionTypeBuilder<
  E extends Effect = Effect,
  K extends ActionTypeKind = ActionTypeKind,
> = `${E}/${K}`;

export type EffectActionTypePatternBuilder<
  E extends EffectActionTypeBuilder = EffectActionTypeBuilder
> = `${Domain}@${E}`;

export enum DataStatus {
  Loading = "loading",
  Fetching = "fetching",
  Loaded = "loaded",
  Error = "error",
  Reset = "reset",
}
