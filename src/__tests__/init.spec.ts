import { init } from "../init";

describe("init", () => {
  test("should return shape with modules (shallow keys comparing)", () => {
    const expectedResultKeys = [
      "reducer",
      "query",
      "mutation",
      "select",
      "invalidate",
      "reset",
      "createMutationActionTypeFromKey",
      "createQueryActionTypeFromKey",
    ];
    expect(
      Object.keys(
        init({
          domain: "domainMock",
          useCache: false,
        }),
      ),
    ).toStrictEqual(expectedResultKeys);
  });
});
