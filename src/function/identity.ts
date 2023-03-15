import { Kind } from ".."

/**
 * `Identity` is a type-level function that takes in a single type argument,
 * `T`, and returns the type `T`.
 *
 * @param T The type to return.
 *
 * @example
 *
 * For example, we can use `Identity` on a type-level string to return the
 * string `"foo"`:
 *
 * ```ts
 * import { $, Function } from "hkt-toolbelt";
 *
 * type Result = $<Function.Identity, "foo">; // "foo"
 * ```
 *
 * @example
 *
 * For example, we can use `Identity` in conjunction with the `List.Map`
 * type-level function to map (and perform no transformation on) a list of
 * numbers:
 *
 * ```ts
 * import { $, List, Function } from "hkt-toolbelt";
 *
 * type Result = $<List.Map<Function.Identity>, [1, 2, 3]>; // [1, 2, 3]
 * ```
 */
export interface Identity extends Kind.Kind {
  f(x: this[Kind._]): typeof x
}
