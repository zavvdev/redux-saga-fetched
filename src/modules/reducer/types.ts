import { CreatedKey } from "../../types";
import { EffectActionTypePatterns } from "../../utils";

export interface GetReducerArgs {
  effectActionPatterns: EffectActionTypePatterns;
};

export type Action = {
  type: string | null;
  payload: {
    createdKey: CreatedKey | null;
    data: unknown;
  };
};