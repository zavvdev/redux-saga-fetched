import {
  ActionTypeKind,
  DataStatus,
  Effect,
  EffectActionTypeBuilder,
  EffectActionTypePatternBuilder,
  Key,
} from "../common";

export type MutationOptions = {
  invalidateKeysOnSuccess?: Key[];
};

export type MutationEffectState<D = unknown> = {
  type: Effect.Mutation;
  isLoading: boolean;
  isLoaded: boolean;
  isError: boolean;
  status: DataStatus;
  data: D | null;
};

export type MutationEffectActionTypesShape<R, S, F, RS> = {
  [ActionTypeKind.Request]: R;
  [ActionTypeKind.Success]: S;
  [ActionTypeKind.Failure]: F;
  [ActionTypeKind.Reset]: RS;
};

export type MutationActionTypeKind = Exclude<
  ActionTypeKind,
  ActionTypeKind.Invalidate
>;

export type MutationActionTypeKinds = Record<
  MutationActionTypeKind,
  MutationActionTypeKind
>;

export type MutationEffectActionType<
  K extends MutationActionTypeKind = MutationActionTypeKind,
> = EffectActionTypeBuilder<Effect.Mutation, K>;

export type MutationEffectActionTypes = MutationEffectActionTypesShape<
  MutationEffectActionType<ActionTypeKind.Request>,
  MutationEffectActionType<ActionTypeKind.Success>,
  MutationEffectActionType<ActionTypeKind.Failure>,
  MutationEffectActionType<ActionTypeKind.Reset>
>;

export type MutationEffectActionTypePatterns = MutationEffectActionTypesShape<
  EffectActionTypePatternBuilder<
    MutationEffectActionType<ActionTypeKind.Request>
  >,
  EffectActionTypePatternBuilder<
    MutationEffectActionType<ActionTypeKind.Success>
  >,
  EffectActionTypePatternBuilder<
    MutationEffectActionType<ActionTypeKind.Failure>
  >,
  EffectActionTypePatternBuilder<MutationEffectActionType<ActionTypeKind.Reset>>
>;

export type MutationEffectActionTypePattern =
  MutationEffectActionTypePatterns[MutationActionTypeKind];
