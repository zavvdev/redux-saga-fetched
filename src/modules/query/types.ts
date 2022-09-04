import {
  ActionTypeKind,
  Effect,
  EffectActionType,
  EffectActionTypePattern,
  EffectState,
} from "types";

export type QueryEffectState<T = unknown> = EffectState<Effect.Query, T>;

export type QueryOptions = {
  useCache?: boolean;
  invalidateInterval?: number;
};

export type QueryEffectActionTypesShape<R, S, F, I, RS> = {
  [ActionTypeKind.Request]: R;
  [ActionTypeKind.Success]: S;
  [ActionTypeKind.Failure]: F;
  [ActionTypeKind.Invalidate]: I;
  [ActionTypeKind.Reset]: RS;
};

export type QueryActionTypeKind = ActionTypeKind;

export type QueryEffectActionType<
K extends QueryActionTypeKind = QueryActionTypeKind
> = EffectActionType<Effect.Query, K>;

export type QueryEffectActionTypes = QueryEffectActionTypesShape<
  QueryEffectActionType<ActionTypeKind.Request>,
  QueryEffectActionType<ActionTypeKind.Success>,
  QueryEffectActionType<ActionTypeKind.Failure>,
  QueryEffectActionType<ActionTypeKind.Invalidate>,
  QueryEffectActionType<ActionTypeKind.Reset>
>;

export type QueryEffectActionTypePatterns = QueryEffectActionTypesShape<
  EffectActionTypePattern<QueryEffectActionType<ActionTypeKind.Request>>,
  EffectActionTypePattern<QueryEffectActionType<ActionTypeKind.Success>>,
  EffectActionTypePattern<QueryEffectActionType<ActionTypeKind.Failure>>,
  EffectActionTypePattern<QueryEffectActionType<ActionTypeKind.Invalidate>>,
  EffectActionTypePattern<QueryEffectActionType<ActionTypeKind.Reset>>
>;
