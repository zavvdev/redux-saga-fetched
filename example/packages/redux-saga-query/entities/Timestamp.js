import { Either as E, identity, pipe } from "utilities";
import { number, positive } from "../validators";

var Timestamp = {
  from: function (createTimestamp) {
    var terminate = (error) => {
      throw new Error(error);
    };

    return pipe(
      createTimestamp(),
      number,
      E.chain(positive),
      E.chain(identity),
      E.chainLeft(terminate),
    );
  },
};

export { Timestamp };
