
import { EffectState, State } from "../../types/state";
import { Domain, Key } from "../../types/common";
import { createKey } from "../../utils";

type GetSelectorArgs = {
  domain: Domain;
}

export const getSelector = (
  { domain }: GetSelectorArgs,
) => (state: State, key: Key): EffectState => {
  const createdKey = createKey(key);
  return state?.[domain]?.[createdKey];
};
