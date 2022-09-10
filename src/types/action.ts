import { CreatedKey, Effect } from "./common";
import {
  QueryEffectActionType,
  QueryEffectActionTypePattern,
  QueryEffectActionTypePatterns,
} from "./modules/query";
import {
  MutationEffectActionType,
  MutationEffectActionTypePattern,
  MutationEffectActionTypePatterns,
} from "./modules/mutation";

export type ActionTypePattern =
  QueryEffectActionTypePattern |
  MutationEffectActionTypePattern;

export type EffectActionType =
  QueryEffectActionType |
  MutationEffectActionType;

export type EffectActionTypePatterns = {
  [Effect.Query]: QueryEffectActionTypePatterns;
  [Effect.Mutation]: MutationEffectActionTypePatterns;
};

export type ActionType<
P extends ActionTypePattern = ActionTypePattern
> = `${CreatedKey}_${P}`;
