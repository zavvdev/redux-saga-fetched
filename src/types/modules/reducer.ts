import { ActionType } from "../action";
import { CreatedKey } from "../common";

export type ActionPayload<T = unknown> = {
  createdKey: CreatedKey;
  data: T;
};

export type Action<T = unknown> = {
  type: ActionType;
  payload: ActionPayload<T>;
};

export type ActionWithoutDataPayload = {
  createdKey: CreatedKey;
};

export type ActionWithoutData = {
  type: ActionType;
  payload: ActionWithoutDataPayload;
};
