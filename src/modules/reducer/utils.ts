import { ActionType } from "../../types/action";
import { CreatedKey } from "../../types/common";
import { Action, ActionWithoutData } from "../../types/modules/reducer";

/* --------- */

type CreateActionArgs<T = unknown> = {
  type: ActionType;
  createdKey: CreatedKey;
  data: T;
};

export function createAction<T = unknown>({
  type,
  createdKey,
  data,
}: CreateActionArgs<T>): Action<T> {
  return {
    type,
    payload: {
      createdKey,
      data,
    },
  };
}

/* --------- */

type CreateActionWithoutDataArgs = {
  type: ActionType;
  createdKey: CreatedKey;
};

export function createActionWithoutData({
  type,
  createdKey,
}: CreateActionWithoutDataArgs): ActionWithoutData {
  return {
    type,
    payload: {
      createdKey,
    },
  };
}

/* --------- */
