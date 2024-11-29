import { pipe, Either as E } from "../_utils";
import { array, arrayOf, isNotNullish } from "../validators";

var Key = {
  from: (parts) => {
    var allowedTypes = ["string", "number", "bigint", "boolean"];

    var terminate = (error) => {
      throw new Error(error);
    };

    var removeNullish = (parts) => parts.filter(isNotNullish);

    var validate = arrayOf(allowedTypes);
    var compose = (parts) => parts.join("_");

    return pipe(
      array(parts),
      E.map(removeNullish),
      E.chain(validate),
      E.chain(compose),
      E.chainLeft(terminate),
    );
  },
};

export { Key };
