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
        [ActionKind.request]: `${domain}@${ActionKind.request}#${id}`,
        [ActionKind.success]: `${domain}@${ActionKind.success}#${id}`,
        [ActionKind.failure]: `${domain}@${ActionKind.failure}#${id}`,
        [ActionKind.invalidate]: `${domain}@${ActionKind.invalidate}#${id}`,
        [ActionKind.reset]: `${domain}@${ActionKind.reset}#${id}`,
      },
      [Effect.Mutation]: {
        [ActionKind.request]: `${domain}@${ActionKind.request}#${id}`,
        [ActionKind.success]: `${domain}@${ActionKind.success}#${id}`,
        [ActionKind.failure]: `${domain}@${ActionKind.failure}#${id}`,
        [ActionKind.reset]: `${domain}@${ActionKind.reset}#${id}`,
      },
    });

    vi.doUnmock("../../03-utilities/general");
  });
});
