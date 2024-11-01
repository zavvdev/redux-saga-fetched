import { Either as E } from "utilities";

/**
 * string :: x -> Either
 */
export function string(x) {
  if (typeof x === "string") {
    return E.right(x);
  }
  return E.left("Expected a string");
}

/**
 * number :: x -> Either
 */
export function number(x) {
  if (typeof x === "number") {
    return E.right(x);
  }
  return E.left("Expected a number");
}
