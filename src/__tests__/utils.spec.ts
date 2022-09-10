import { CreatedKey, Domain, Key } from "../types/common";
import {
  createActionType,
  createEffectActionTypePatterns,
  createKey,
} from "../utils";
import { QueryEffectActionTypePattern } from "../types/modules/query";
import { MutationEffectActionTypePattern } from "../types/modules/mutation";
import { EffectActionTypePatterns } from "../types/action";

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
    const effectActionTypePattern: QueryEffectActionTypePattern =
      "123@query/request";
    const createdKey: CreatedKey = "created_key";
    const actionType = createActionType({
      createdKey,
      effectActionTypePattern,
    });
    const expectedActionType = `${createdKey}_${effectActionTypePattern}`;
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
    const domain: Domain = "test";
    const expected: EffectActionTypePatterns = {
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
    };
    expect(createEffectActionTypePatterns(domain)).toStrictEqual(expected);
  });
});

/* --------- */
