import { CreatedKey } from "types";
import { EffectActionTypePatterns } from "utils";

export type GetReducerArgs = {
  effectActionTypePatterns: EffectActionTypePatterns;
}

export type Action<T = unknown> = {
  type: string | null;
  payload: {
    createdKey: CreatedKey | null;
    data: T | null;
  };
};
