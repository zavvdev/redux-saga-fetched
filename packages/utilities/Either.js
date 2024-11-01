class Either {
  constructor(x) {
    this.$value = x;
  }

  static right(x) {
    return new Right(x);
  }

  static left(x) {
    return new Left(x);
  }

  static map(fn) {
    return (x) => (x?.isRight ? new Right(fn(x.join())) : x);
  }

  static chain(fn) {
    return (x) => (x?.isRight ? fn(x.join()) : x);
  }

  static mapLeft(fn) {
    return (x) => (x?.isLeft ? new Left(fn(x.join())) : x);
  }

  static chainLeft(fn) {
    return (x) => (x?.isLeft ? fn(x.join()) : x);
  }

  /**
   * @param {Left | Right} x
   * @returns {boolean}
   */
  static isLeft(x) {
    return Boolean(x?.isLeft);
  }

  /**
   * @param {Left | Right} x
   * @returns {boolean}
   */
  static isRight(x) {
    return Boolean(x?.isRight);
  }

  /**
   * @template {unknown} T
   * @param {Left | Right} x
   * @returns {T}
   */
  static join(x) {
    if (x?.isLeft || x?.isRight) {
      return x.join();
    }
    throw new Error("Not an Either type");
  }
}

class Left extends Either {
  get isLeft() {
    return true;
  }

  get isRight() {
    return false;
  }

  static of() {
    throw new Error(
      "`of` called on class Left (value) instead of Either (type)",
    );
  }

  map() {
    return this;
  }

  join() {
    return this.$value;
  }
}

class Right extends Either {
  get isLeft() {
    return false;
  }

  get isRight() {
    return true;
  }

  static of() {
    throw new Error(
      "`of` called on class Right (value) instead of Either (type)",
    );
  }

  map(fn) {
    return Either.right(fn(this.$value));
  }

  join() {
    return this.$value;
  }
}

export { Either };
