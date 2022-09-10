import { QueryEffectState } from "./modules/query";
import { MutationEffectState } from "./modules/mutation";
import { CreatedKey, Domain } from "./common";

export type EffectState = QueryEffectState | MutationEffectState;

export type StateNode<
  S extends EffectState = EffectState
> = Record<CreatedKey, S>;

export type State<
  S extends EffectState = EffectState
> = Record<Domain, StateNode<S>>;
