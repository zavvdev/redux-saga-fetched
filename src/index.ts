export function isEven(n: number) {
  return n % 2 === 0;
}

export function isNullish(v: unknown) {
  return v === null || v === undefined;
}