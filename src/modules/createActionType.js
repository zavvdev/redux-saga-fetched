import { EFFECT_STAGE_TYPES, EFFECT_TYPES } from "../config";
import { Key } from "../entities/Key";
import { Either as E, prop, pipe } from "../_utils";
import { createActionType } from "./_helpers";

export function getCreateActionType({
  actionTypePatterns: patterns,
}) {
  return ({ type, stage, key }) => {
    var terminate = (x) => {
      throw new Error(x);
    };

    var validate = ([type, stage]) => {
      var types = Object.values(EFFECT_TYPES);
      var stages = Object.values(EFFECT_STAGE_TYPES);

      if (types.includes(type) && stages.includes(stage)) {
        return E.right([type, stage]);
      }

      return E.left("Invalid effect type or stage");
    };

    var compose = ([type, stage]) => {
      var key_ = Key.from(key);
      var actionType = createActionType(key_);

      return pipe(patterns, prop(type), prop(stage), actionType);
    };

    return pipe(
      [type, stage],
      validate,
      E.chain(compose),
      E.chainLeft(terminate),
    );
  };
}
