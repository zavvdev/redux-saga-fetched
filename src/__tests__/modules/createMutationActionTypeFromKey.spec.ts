import { getCreateMutationActionTypeFromKey } from "../../modules/createMutationActionTypeFromKey";
import { MUTATION_ACTION_TYPE_KINDS } from "../../modules/mutation/config";
import { ActionType } from "../../types/action";
import { Domain, Key } from "../../types/common";
import { MutationEffectActionTypePattern } from "../../types/modules/mutation";
import { createKey } from "../../utils";
import { getEffectActionTypePatternsMock } from "../mocks";

describe("createMutationActionTypeFromKey", () => {
  type ExpectedResult = ActionType<MutationEffectActionTypePattern>;

  const key: Key = ["getUser", 1];
  const domain: Domain = "mockDomain";
  const effectActionTypePatterns = getEffectActionTypePatternsMock(domain);

  const createMutationActionTypeFromKey = getCreateMutationActionTypeFromKey({
    effectActionTypePatterns,
  });

  test("should create mutation request action type", () => {
    const requestPattern = effectActionTypePatterns.mutation.request;
    const createdKey = createKey(key);
    const expectedResult: ExpectedResult = `${createdKey}_${requestPattern}`;
    const kind = MUTATION_ACTION_TYPE_KINDS.request;
    expect(createMutationActionTypeFromKey(key, kind)).toBe(expectedResult);
  });

  test("should create mutation success action type", () => {
    const requestPattern = effectActionTypePatterns.mutation.success;
    const createdKey = createKey(key);
    const expectedResult: ExpectedResult = `${createdKey}_${requestPattern}`;
    const kind = MUTATION_ACTION_TYPE_KINDS.success;
    expect(createMutationActionTypeFromKey(key, kind)).toBe(expectedResult);
  });

  test("should create mutation failure action type", () => {
    const requestPattern = effectActionTypePatterns.mutation.failure;
    const createdKey = createKey(key);
    const expectedResult: ExpectedResult = `${createdKey}_${requestPattern}`;
    const kind = MUTATION_ACTION_TYPE_KINDS.failure;
    expect(createMutationActionTypeFromKey(key, kind)).toBe(expectedResult);
  });

  test("should create mutation reset action type", () => {
    const requestPattern = effectActionTypePatterns.mutation.reset;
    const createdKey = createKey(key);
    const expectedResult: ExpectedResult = `${createdKey}_${requestPattern}`;
    const kind = MUTATION_ACTION_TYPE_KINDS.reset;
    expect(createMutationActionTypeFromKey(key, kind)).toBe(expectedResult);
  });
});
