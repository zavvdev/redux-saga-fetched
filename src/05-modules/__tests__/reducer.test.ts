import { describe, expect, it } from "vitest";
import { EffectActionTypePatterns } from "../../04-helpers/general";
import { ActionKind, Effect, State } from "../../01-types/general";
import {
  composeActionTypePattern,
  genInstanceId,
} from "../../03-utilities/general";
import { getReducer } from "../reducer";

describe("reducer", () => {
  const domain = "domainTest";
  const instanceId = genInstanceId();

  const effectActionTypePatterns = {
    [Effect.Query]: {
      [ActionKind.Request]: composeActionTypePattern(
        domain,
        Effect.Query,
        ActionKind.Request,
        instanceId,
      ),
      [ActionKind.Success]: composeActionTypePattern(
        domain,
        Effect.Query,
        ActionKind.Success,
        instanceId,
      ),
      [ActionKind.Failure]: composeActionTypePattern(
        domain,
        Effect.Query,
        ActionKind.Failure,
        instanceId,
      ),
      [ActionKind.Invalidate]: composeActionTypePattern(
        domain,
        Effect.Query,
        ActionKind.Invalidate,
        instanceId,
      ),
      [ActionKind.Reset]: composeActionTypePattern(
        domain,
        Effect.Query,
        ActionKind.Reset,
        instanceId,
      ),
    },
    [Effect.Mutation]: {
      [ActionKind.Request]: composeActionTypePattern(
        domain,
        Effect.Mutation,
        ActionKind.Request,
        instanceId,
      ),
      [ActionKind.Success]: composeActionTypePattern(
        domain,
        Effect.Mutation,
        ActionKind.Success,
        instanceId,
      ),
      [ActionKind.Failure]: composeActionTypePattern(
        domain,
        Effect.Mutation,
        ActionKind.Failure,
        instanceId,
      ),
      [ActionKind.Reset]: composeActionTypePattern(
        domain,
        Effect.Mutation,
        ActionKind.Reset,
        instanceId,
      ),
    },
  } satisfies EffectActionTypePatterns;

  const reducer = getReducer(effectActionTypePatterns);

  it("should return previous state", () => {
    const state = { age: 23 } as any;
    expect(reducer(state, { type: "actionTest" } as any)).toEqual(state);
  });
});
