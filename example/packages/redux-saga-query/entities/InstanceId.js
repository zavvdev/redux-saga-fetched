import { identity, pipe, Either as E } from "utilities";
import { string } from "../validators.js";

var InstanceId = {
  from: function (idCreator) {
    var terminate = (error) => {
      throw new Error(error);
    };

    return pipe(
      idCreator(),
      string,
      E.chain(identity),
      E.chainLeft(terminate),
    );
  },
};

export { InstanceId };
