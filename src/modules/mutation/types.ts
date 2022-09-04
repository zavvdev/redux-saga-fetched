import {
  ActionTypeKind,
  Effect,
  EffectActionType,
  EffectActionTypePattern,
  EffectState,
} from "types";
import { Key } from "../../types";

export type MutationOptions = {
  invalidateKeysOnSuccess?: Key[];
}

export type MutationEffectState<T = unknown> = Omit<
  EffectState<Effect.Mutation, T>,
  "isValid" | "isFetching"
>;

export type MutationEffectActionTypesShape<R, S, F, RS> = {
  [ActionTypeKind.Request]: R;
  [ActionTypeKind.Success]: S;
  [ActionTypeKind.Failure]: F;
  [ActionTypeKind.Reset]: RS;
};

export type MutationActionTypeKind = Exclude<
  ActionTypeKind, ActionTypeKind.Invalidate
>;

export type MutationEffectActionType<
  K extends MutationActionTypeKind = MutationActionTypeKind
> = EffectActionType<Effect.Mutation, K>;

export type MutationEffectActionTypes = MutationEffectActionTypesShape<
  MutationEffectActionType<ActionTypeKind.Request>,
  MutationEffectActionType<ActionTypeKind.Success>,
  MutationEffectActionType<ActionTypeKind.Failure>,
  MutationEffectActionType<ActionTypeKind.Reset>
>;

export type MutationEffectActionTypePatterns = MutationEffectActionTypesShape<
  EffectActionTypePattern<MutationEffectActionType<ActionTypeKind.Request>>,
  EffectActionTypePattern<MutationEffectActionType<ActionTypeKind.Success>>,
  EffectActionTypePattern<MutationEffectActionType<ActionTypeKind.Failure>>,
  EffectActionTypePattern<MutationEffectActionType<ActionTypeKind.Reset>>
>;
