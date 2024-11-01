export { Either } from "./Either.js";

/**
 * identity :: x -> x
 *
 * @template {unknown} T
 * @param {T} x
 * @returns {T}
 */
export var identity = (x) => x;

/**
 * pipe :: (x, (x -> y), (y -> z), ..., (b -> c)) -> c
 *
 * @template {unknown} X
 * @template {unknown} C
 * @param {X} x
 * @param {Array<Function>} fns
 * @returns {X | C}
 */
export var pipe = (x, ...fns) => fns.reduce((r, f) => f(r), x);

/**
 * cond :: (a -> b), [(a -> Boolean, a -> b)], ... [(a -> Boolean, a -> b)] -> a -> b
 *
 * @template {unknown} F
 * @template {unknown} R
 * @template {unknown} T
 * @param {(T) => F} elseClause
 * @param {Array<[(T) => boolean, (x: T) => R]>} ifClauses
 * @retuns {(x: T) => F | R}
 */
export var cond =
  (elseClause, ...ifClauses) =>
  (x) =>
    ifClauses.find((ifClause) => ifClause[0](x))?.[1]?.(x) ||
    elseClause(x);
