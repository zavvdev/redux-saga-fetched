import { describe, it, expect, vi } from "vitest";
import { createEffectActionTypePatterns } from "../general";
import { ActionKind, Effect } from "../../01-types/general";

describe("createEffectActionTypePatterns", () => {
  it("should create effect action type patterns", () => {
    vi.mock("../../03-utilities/general", async () => {
      const general: Record<string, unknown> = await vi.importActual(
        "../../03-utilities/general",
      );
      return {
        ...general,
        genInstanceId: () => "42-42-42",
      };
    });

    const domain = "testDomain";
    const id = "42-42-42";

    expect(createEffectActionTypePatterns(domain)).toEqual({
      [Effect.Query]: {
        [ActionKind.Request]: `${Effect.Query}_${ActionKind.Request}#${domain}${id}`,
        [ActionKind.Success]: `${Effect.Query}_${ActionKind.Success}#${domain}${id}`,
        [ActionKind.Failure]: `${Effect.Query}_${ActionKind.Failure}#${domain}${id}`,
        [ActionKind.Invalidate]: `${Effect.Query}_${ActionKind.Invalidate}#${domain}${id}`,
        [ActionKind.Reset]: `${Effect.Query}_${ActionKind.Reset}#${domain}${id}`,
      },
      [Effect.Mutation]: {
        [ActionKind.Request]: `${Effect.Mutation}_${ActionKind.Request}#${domain}${id}`,
        [ActionKind.Success]: `${Effect.Mutation}_${ActionKind.Success}#${domain}${id}`,
        [ActionKind.Failure]: `${Effect.Mutation}_${ActionKind.Failure}#${domain}${id}`,
        [ActionKind.Reset]: `${Effect.Mutation}_${ActionKind.Reset}#${domain}${id}`,
      },
    });

    vi.doUnmock("../../03-utilities/general");
  });
});
