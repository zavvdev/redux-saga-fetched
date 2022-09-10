import { CreatedKey } from "../common";

export type Action<T = unknown> = {
  type: string | null;
  payload: {
    createdKey: CreatedKey | null;
    data: T | null;
  };
};
