import { CreatedKey, Key } from "../types/common";
import { MutationEffectActionTypePattern } from "../types/modules/mutation";
import { QueryEffectActionTypePattern } from "../types/modules/query";
import {
  createActionType,
  createEffectActionTypePatterns,
  createKey,
} from "../utils";
import { getEffectActionTypePatternsMock } from "./mocks";

/* --------- */

describe("createKey", () => {
  test("should return created key (key with 1 entry)", () => {
    const key: Key = ["getUser"];
    const expectedCreatedKey: CreatedKey = String(key[0]);
    const createdKey = createKey(key);
    expect(createdKey).toBe(expectedCreatedKey);
  });

  test("should return created key (key with 2 entries)", () => {
    const key: Key = ["getUser", "1"];
    const expectedCreatedKey: CreatedKey = `${key[0]}_${[key[1]]}`;
    const createdKey = createKey(key);
    expect(createdKey).toBe(expectedCreatedKey);
  });

  test("should return created key (key with 3 entries)", () => {
    const key: Key = ["getUser", "1", 2];
    const expectedCreatedKey: CreatedKey = `${key[0]}_${key[1]}_${key[2]}`;
    const createdKey = createKey(key);
    expect(createdKey).toBe(expectedCreatedKey);
  });
});

/* --------- */

describe("createActionType", () => {
  test("should return action type for query effect", () => {
    const pattern: QueryEffectActionTypePattern = "123@query/request";
    const createdKey: CreatedKey = "created_key";
    const actionType = createActionType({
      createdKey,
      effectActionTypePattern: pattern,
    });
    const expectedActionType = `${createdKey}_${pattern}`;
    expect(actionType).toBe(expectedActionType);
  });

  test("should return action type for mutation effect", () => {
    const effectActionTypePattern: MutationEffectActionTypePattern =
      "123@mutation/request";
    const createdKey: CreatedKey = "created_key";
    const actionType = createActionType({
      createdKey,
      effectActionTypePattern,
    });
    const expectedActionType = `${createdKey}_${effectActionTypePattern}`;
    expect(actionType).toBe(expectedActionType);
  });
});

/* --------- */

describe("createEffectActionTypePatterns", () => {
  test("should return effect action type patterns", () => {
    const domain = "domainMock";
    expect(createEffectActionTypePatterns(domain)).toStrictEqual(
      getEffectActionTypePatternsMock(domain),
    );
  });
});

/* --------- */
