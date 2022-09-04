
import { Domain, Key, RootState } from "types";
import { createKey } from "utils";

type GetSelectorArgs = {
  domain: Domain
}

export const getSelector = (
  { domain }: GetSelectorArgs,
) => (state: RootState, key: Key) => {
  const createdKey = createKey(key);
  return state?.[domain]?.[createdKey];
};
