import { expect, test } from "vitest";
import { createActionTypePatterns } from "../../modules/_helpers";
import { getCreateActionType } from "../../modules/createActionType";
import { describe } from "vitest";
import { EFFECT_STAGE_TYPES, EFFECT_TYPES } from "../../config";

var domain = "domain";

var actionTypePatterns = createActionTypePatterns(() => 123)(domain);

var createActionType = getCreateActionType({
  actionTypePatterns,
});

test("should throw if type is invalid", () => {
  expect(() =>
    createActionType({
      type: "inv",
      stage: EFFECT_STAGE_TYPES.failure,
      key: ["key"],
    }),
  ).toThrow("Invalid effect type or stage");
});

test("should throw if stage is invalid", () => {
  expect(() =>
    createActionType({
      type: EFFECT_TYPES.query,
      stage: "inv",
      key: ["key"],
    }),
  ).toThrow("Invalid effect type or stage");
});

test("should throw if key is invalid", () => {
  expect(() =>
    createActionType({
      type: EFFECT_TYPES.query,
      stage: EFFECT_STAGE_TYPES.failure,
      key: {},
    }),
  ).toThrow("Expected an array");
});

describe("query", () => {
  test("request", () => {
    expect(
      createActionType({
        type: EFFECT_TYPES.query,
        stage: EFFECT_STAGE_TYPES.request,
        key: ["key"],
      }),
    ).toEqual("key@query_request@domain#123");
  });

  test("success", () => {
    expect(
      createActionType({
        type: EFFECT_TYPES.query,
        stage: EFFECT_STAGE_TYPES.success,
        key: ["key"],
      }),
    ).toEqual("key@query_success@domain#123");
  });

  test("failure", () => {
    expect(
      createActionType({
        type: EFFECT_TYPES.query,
        stage: EFFECT_STAGE_TYPES.failure,
        key: ["key"],
      }),
    ).toEqual("key@query_failure@domain#123");
  });

  test("invalidate", () => {
    expect(
      createActionType({
        type: EFFECT_TYPES.query,
        stage: EFFECT_STAGE_TYPES.invalidate,
        key: ["key"],
      }),
    ).toEqual("key@query_invalidate@domain#123");
  });

  test("reset", () => {
    expect(
      createActionType({
        type: EFFECT_TYPES.query,
        stage: EFFECT_STAGE_TYPES.reset,
        key: ["key"],
      }),
    ).toEqual("key@query_reset@domain#123");
  });
});

describe("mutation", () => {
  test("request", () => {
    expect(
      createActionType({
        type: EFFECT_TYPES.mutation,
        stage: EFFECT_STAGE_TYPES.request,
        key: ["key"],
      }),
    ).toEqual("key@mutation_request@domain#123");
  });

  test("success", () => {
    expect(
      createActionType({
        type: EFFECT_TYPES.mutation,
        stage: EFFECT_STAGE_TYPES.success,
        key: ["key"],
      }),
    ).toEqual("key@mutation_success@domain#123");
  });

  test("failure", () => {
    expect(
      createActionType({
        type: EFFECT_TYPES.mutation,
        stage: EFFECT_STAGE_TYPES.failure,
        key: ["key"],
      }),
    ).toEqual("key@mutation_failure@domain#123");
  });
});
