import { Key } from "../entities/Key";

var getSelector = function (domain) {
  return function (state, key) {
    var createdKey = Key.from(key);
    return state?.[domain]?.[createdKey];
  };
};

export { getSelector };
