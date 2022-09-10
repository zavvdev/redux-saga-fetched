import {
  ActionTypeKind,
  Effect,
  EffectActionTypePatternBuilder,
  EffectActionTypeBuilder,
  DataStatus,
} from "../common";

export type QueryEffectState<D = unknown> = {
  type: Effect.Query;
  isLoading: boolean;
  isFetching: boolean;
  isLoaded: boolean;
  isError: boolean;
  isValid: boolean;
  status: DataStatus;
  data: D | null;
};

export type QueryOptions = {
  useCache?: boolean;
  invalidateInterval?: number;
};

type QueryEffectActionTypesShape<R, S, F, I, RS> = {
  [ActionTypeKind.Request]: R;
  [ActionTypeKind.Success]: S;
  [ActionTypeKind.Failure]: F;
  [ActionTypeKind.Invalidate]: I;
  [ActionTypeKind.Reset]: RS;
};

export type QueryActionTypeKind = ActionTypeKind;

export type QueryEffectActionType<
  K extends QueryActionTypeKind = QueryActionTypeKind,
> = EffectActionTypeBuilder<Effect.Query, K>;

export type QueryEffectActionTypes = QueryEffectActionTypesShape<
  QueryEffectActionType<ActionTypeKind.Request>,
  QueryEffectActionType<ActionTypeKind.Success>,
  QueryEffectActionType<ActionTypeKind.Failure>,
  QueryEffectActionType<ActionTypeKind.Invalidate>,
  QueryEffectActionType<ActionTypeKind.Reset>
>;

export type QueryEffectActionTypePatterns = QueryEffectActionTypesShape<
  EffectActionTypePatternBuilder<QueryEffectActionType<ActionTypeKind.Request>>,
  EffectActionTypePatternBuilder<QueryEffectActionType<ActionTypeKind.Success>>,
  EffectActionTypePatternBuilder<QueryEffectActionType<ActionTypeKind.Failure>>,
  EffectActionTypePatternBuilder<
    QueryEffectActionType<ActionTypeKind.Invalidate>
  >,
  EffectActionTypePatternBuilder<QueryEffectActionType<ActionTypeKind.Reset>>
>;

export type QueryEffectActionTypePattern =
  QueryEffectActionTypePatterns[QueryActionTypeKind];
