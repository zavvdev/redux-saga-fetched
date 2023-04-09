import { InitOptions } from "./01-types/general";
import { createInitOptions } from "./03-utilities/general";
import { createEffectActionTypePatterns } from "./04-helpers/general";

export function initSagaQuery(nextOptions: InitOptions) {
  const options = createInitOptions(nextOptions);

  const effectActionTypePatterns = createEffectActionTypePatterns(
    options.domain,
  );

  return {};
}
