import { createKey } from "utils";

export const getSelector = ({ domain }) => (state, key) => {
  const createdKey = createKey(key);
  return state?.[domain]?.[createdKey];
};
