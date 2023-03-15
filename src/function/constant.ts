import { Kind } from ".."

interface Constant_T<X> extends Kind.Kind {
  f(x: this[Kind._]): X
}

/**
 * `Constant` is a type-level function that takes in a single type argument,
 * `X`, and returns a new type-level function that returns `X`.
 *
 * The returned type-level function takes in a single argument of any type,
 * `T`, and returns the constant type `X`.
 *
 * @param X The constant type to return.
 *
 * @example
 *
 * For example, we can use `Constant` to create a type-level function that
 * always returns the type `"foo"`:
 *
 * ```ts
 * import { $, Function } from "hkt-toolbelt";
 *
 * type Result = $<$<Function.Constant, "foo">, 0>; // "foo"
 * ```
 */
export interface Constant extends Kind.Kind {
  f(x: this[Kind._]): Constant_T<typeof x>
}
