import { getReducer } from "modules/reducer";
// import { getQuery } from "modules/query";
// import { getSelector } from "modules/selector";
import { DOMAIN } from "config";
// import { getMutation } from "modules/mutation";
// import { getInvalidate } from "modules/invalidate";
import { createEffectActionPatterns } from "utils";
// import { getCreateActionTypeFromKey } from "modules/createActionTypeFromKey";
// import { getReset } from "modules/reset";
import { Domain } from "types";

interface InitArgs {
  domain: Domain;
}

export const init = ({ domain }: InitArgs) => {
  const options = {
    domain: domain || DOMAIN,
  };

  const effectActionPatterns = createEffectActionPatterns(options.domain);

  return {
    reducer: getReducer({
      effectActionPatterns,
    }),
    // query: getQuery({
    //   effectActionPatterns,
    //   domain: options.domain,
    // }),
    // mutation: getMutation({
    //   effectActionPatterns,
    //   domain: options.domain,
    // }),
    // select: getSelector({
    //   domain: options.domain,
    // }),
    // invalidate: getInvalidate({
    //   effectActionPatterns,
    //   domain: options.domain,
    // }),
    // reset: getReset({
    //   effectActionPatterns,
    //   domain: options.domain,
    // }),
    // createActionTypeFromKey: getCreateActionTypeFromKey({
    //   domain: options.domain,
    // }),
  };
};
