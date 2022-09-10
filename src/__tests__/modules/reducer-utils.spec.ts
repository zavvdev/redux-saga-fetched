import { init } from "../../index";
import {
  createAction,
  createActionWithoutData,
} from "../../modules/reducer/utils";
import { Domain, Key } from "../../types/common";
import { Action, ActionWithoutData } from "../../types/modules/reducer";
import { createKey } from "../../utils";

const domain: Domain = "domainMock";
const key: Key = ["mock", "key"];
const createdKey = createKey(key);

const { createQueryActionTypeFromKey, createMutationActionTypeFromKey } = init({
  domain,
});

describe("createAction", () => {
  test("should create query action", () => {
    const expectedAction: Action<number> = {
      type: createQueryActionTypeFromKey(key, "request"),
      payload: {
        createdKey,
        data: 123,
      },
    };
    expect(
      createAction({
        type: createQueryActionTypeFromKey(key, "request"),
        createdKey,
        data: 123,
      }),
    ).toStrictEqual(expectedAction);
  });

  test("should create mutation action", () => {
    const expectedAction: Action<number> = {
      type: createMutationActionTypeFromKey(key, "success"),
      payload: {
        createdKey,
        data: 123,
      },
    };
    expect(
      createAction({
        type: createMutationActionTypeFromKey(key, "success"),
        createdKey,
        data: 123,
      }),
    ).toStrictEqual(expectedAction);
  });
});

describe("createActionWithoutData", () => {
  test("should create query action without data", () => {
    const expectedAction: ActionWithoutData = {
      type: createQueryActionTypeFromKey(key, "failure"),
      payload: {
        createdKey,
      },
    };
    expect(
      createActionWithoutData({
        type: createQueryActionTypeFromKey(key, "failure"),
        createdKey,
      }),
    ).toStrictEqual(expectedAction);
  });

  test("should create mutation action without data", () => {
    const expectedAction: ActionWithoutData = {
      type: createMutationActionTypeFromKey(key, "reset"),
      payload: {
        createdKey,
      },
    };
    expect(
      createActionWithoutData({
        type: createMutationActionTypeFromKey(key, "reset"),
        createdKey,
      }),
    ).toStrictEqual(expectedAction);
  });
});
