import { Either as E } from "./_utils";

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

/**
 * array :: x -> Either
 */
export function array(x) {
  if (Array.isArray(x)) {
    return E.right(x);
  }
  return E.left("Expected an array");
}

/**
 * isNotNullish :: x -> boolean
 */
export function isNotNullish(x) {
  return x !== null && x !== undefined;
}

/**
 * arrayOf :: [string] -> x -> Either
 */
export var arrayOf = (types) => (x) => {
  for (let n of x) {
    if (!types.includes(typeof n)) {
      return E.left("Expected an array of " + types.join(", "));
    }
  }
  return E.right(x);
};

/**
 * positive :: x -> Either
 */
export function positive(x) {
  if (x >= 0) {
    return E.right(x);
  }
  return E.left("Expected a positive number");
}

/**
 * object :: x -> Either
 */
export function object(x) {
  if (typeof x === "object" && x !== null && !Array.isArray(x)) {
    return E.right(x);
  }
  return E.left("Expected an object");
}

/**
 * fn :: x -> Either
 */
export function fn(x) {
  if (typeof x === "function") {
    return E.right(x);
  }
  return E.left("Expected a function");
}

/**
 * numberOrUndefined :: x -> Either
 */
export function numberOrUndefined(x) {
  if (typeof x === "number" || x === undefined) {
    return E.right(x);
  }
  return E.left("Expected a number or undefined");
}
