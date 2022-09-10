import { init } from "../../index";
import { DataStatus, Domain, Effect, Key } from "../../types/common";
import { QueryEffectState } from "../../types/modules/query";
import { createKey } from "../../utils";

describe("selector", () => {
  const domain: Domain = "domainMock";

  const { select } = init({ domain });

  test("should return state", () => {
    const key: Key = ["getUser"];
    const createdKey = createKey(key);
    const expectedResult: QueryEffectState<number> = {
      type: Effect.Query,
      isLoading: false,
      isLoaded: true,
      isFetching: false,
      isError: false,
      isValid: true,
      status: DataStatus.Loaded,
      data: 123,
    };
    const state = {
      [domain]: {
        [createdKey]: expectedResult,
      },
    };
    expect(select(state, key)).toBe(expectedResult);
  });
});
