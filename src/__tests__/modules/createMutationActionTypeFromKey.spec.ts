import { ActionType } from "../../types/action";
import { Domain, Key } from "../../types/common";
import { MutationEffectActionTypePattern } from "../../types/modules/mutation";
import { createKey } from "../../utils";
import { getEffectActionTypePatternsMock } from "../__mocks__/common";
import { init } from "../../init";

describe("createMutationActionTypeFromKey", () => {
  type ExpectedResult = ActionType<MutationEffectActionTypePattern>;

  const domain: Domain = "mockDomain";
  const key: Key = ["patchUser", 1];
  const createdKey = createKey(key);
  const effectActionTypePatterns = getEffectActionTypePatternsMock(domain);

  const { createMutationActionTypeFromKey } = init({
    domain,
  });

  test("should create mutation request action type", () => {
    const requestPattern = effectActionTypePatterns.mutation.request;
    const expectedResult: ExpectedResult = `${createdKey}_${requestPattern}`;
    expect(createMutationActionTypeFromKey(key, "request")).toBe(
      expectedResult,
    );
  });

  test("should create mutation success action type", () => {
    const requestPattern = effectActionTypePatterns.mutation.success;
    const expectedResult: ExpectedResult = `${createdKey}_${requestPattern}`;
    expect(createMutationActionTypeFromKey(key, "success")).toBe(
      expectedResult,
    );
  });

  test("should create mutation failure action type", () => {
    const requestPattern = effectActionTypePatterns.mutation.failure;
    const expectedResult: ExpectedResult = `${createdKey}_${requestPattern}`;
    expect(createMutationActionTypeFromKey(key, "failure")).toBe(
      expectedResult,
    );
  });

  test("should create mutation reset action type", () => {
    const requestPattern = effectActionTypePatterns.mutation.reset;
    const expectedResult: ExpectedResult = `${createdKey}_${requestPattern}`;
    expect(createMutationActionTypeFromKey(key, "reset")).toBe(expectedResult);
  });
});
