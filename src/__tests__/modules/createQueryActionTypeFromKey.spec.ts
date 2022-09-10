import { getCreateQueryActionTypeFromKey } from "../../modules/createQueryActionTypeFromKey";
import { ActionType } from "../../types/action";
import { Domain, Key } from "../../types/common";
import { QueryEffectActionTypePattern } from "../../types/modules/query";
import { createKey } from "../../utils";
import { getEffectActionTypePatternsMock } from "../__mocks__/common";

describe("createQueryActionTypeFromKey", () => {
  type ExpectedResult = ActionType<QueryEffectActionTypePattern>;

  const key: Key = ["getUser", 1];
  const createdKey = createKey(key);
  const domain: Domain = "mockDomain";
  const effectActionTypePatterns = getEffectActionTypePatternsMock(domain);

  const createQueryActionTypeFromKey = getCreateQueryActionTypeFromKey({
    effectActionTypePatterns,
  });

  test("should create query request action type", () => {
    const requestPattern = effectActionTypePatterns.query.request;
    const expectedResult: ExpectedResult = `${createdKey}_${requestPattern}`;
    expect(createQueryActionTypeFromKey(key, "request")).toBe(expectedResult);
  });

  test("should create query success action type", () => {
    const requestPattern = effectActionTypePatterns.query.success;
    const expectedResult: ExpectedResult = `${createdKey}_${requestPattern}`;
    expect(createQueryActionTypeFromKey(key, "success")).toBe(expectedResult);
  });

  test("should create query failure action type", () => {
    const requestPattern = effectActionTypePatterns.query.failure;
    const expectedResult: ExpectedResult = `${createdKey}_${requestPattern}`;
    expect(createQueryActionTypeFromKey(key, "failure")).toBe(expectedResult);
  });

  test("should create query invalidate action type", () => {
    const requestPattern = effectActionTypePatterns.query.invalidate;
    const expectedResult: ExpectedResult = `${createdKey}_${requestPattern}`;
    expect(createQueryActionTypeFromKey(key, "invalidate")).toBe(
      expectedResult,
    );
  });

  test("should create query reset action type", () => {
    const requestPattern = effectActionTypePatterns.query.reset;
    const expectedResult: ExpectedResult = `${createdKey}_${requestPattern}`;
    expect(createQueryActionTypeFromKey(key, "reset")).toBe(expectedResult);
  });
});
