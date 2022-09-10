import { EffectActionTypePatterns } from "../types/action";
import { Domain } from "../types/common";

export const getEffectActionTypePatternsMock = (
  domain: Domain,
): EffectActionTypePatterns => ({
  query: {
    request: `${domain}@query/request`,
    success: `${domain}@query/success`,
    failure: `${domain}@query/failure`,
    invalidate: `${domain}@query/invalidate`,
    reset: `${domain}@query/reset`,
  },
  mutation: {
    request: `${domain}@mutation/request`,
    success: `${domain}@mutation/success`,
    failure: `${domain}@mutation/failure`,
    reset: `${domain}@mutation/reset`,
  },
});
