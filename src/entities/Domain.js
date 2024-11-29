import { Either as E, identity, pipe } from "utilities";
import { string } from "../validators";

var Domain = {
  from: function (value) {
    var terminate = (error) => {
      throw new Error(error);
    };

    return pipe(
      value,
      string,
      E.chain(identity),
      E.chainLeft(terminate),
    );
  },
};

export { Domain };
