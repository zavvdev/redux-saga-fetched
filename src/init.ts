import { getReducer } from "modules/reducer";
import { getQuery } from "modules/query";
import { getSelector } from "modules/selector";
import { DOMAIN } from "config";
import { getMutation } from "modules/mutation";
import { getInvalidate } from "modules/invalidate";
import { createEffectActionTypePatterns } from "utils";
import { getCreateMutationActionTypeFromKey } from "modules/createMutationActionTypeFromKey";
import { getReset } from "modules/reset";
import { Domain } from "types";
import { getCreateQueryActionTypeFromKey } from "modules/createQueryActionTypeFromKey";

type InitArgs = {
  domain: Domain;
}

export const init = ({ domain }: InitArgs) => {
  const options = {
    domain: domain || DOMAIN,
  };

  const effectActionTypePatterns = createEffectActionTypePatterns(
    options.domain,
  );

  return {
    reducer: getReducer({
      effectActionTypePatterns,
    }),
    query: getQuery({
      effectActionTypePatterns,
      domain: options.domain,
    }),
    mutation: getMutation({
      effectActionTypePatterns,
      domain: options.domain,
    }),
    select: getSelector({
      domain: options.domain,
    }),
    invalidate: getInvalidate({
      effectActionTypePatterns,
      domain: options.domain,
    }),
    reset: getReset({
      effectActionTypePatterns,
      domain: options.domain,
    }),
    createMutationActionTypeFromKey: getCreateMutationActionTypeFromKey({
      effectActionTypePatterns,
    }),
    createQueryActionTypeFromKey: getCreateQueryActionTypeFromKey({
      effectActionTypePatterns,
    }),
  };
};
