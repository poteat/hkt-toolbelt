import { Kind, Type, List } from '..'

/**
 * `_$of` is a type-level function that takes in a value `X` and returns a list
 * containing only that value.
 *
 * @template {unknown} X - The value to include in the list.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * type Result = List._$of<42>; // [42]
 * ```
 */
export type _$of<X> = [X]

/**
 * `Of` is a type-level function that takes in a value `X` and returns a list
 * containing only that value.
 *
 * @template {unknown} X - The value to include in the list.
 *
 * @example
 * ```ts
 * import { $, List } from "hkt-toolbelt";
 *
 * type Result = $<List.Of, 42>; // [42]
 * ```
 */
export interface Of extends Kind.Kind {
  f(x: this[Kind._]): _$of<typeof x>
}

/**
 * Given a value, return a list containing only that value.
 *
 * @param {unknown} x - The value to include in the list.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.of(42)
 * //    ^? [42]
 * ```
 */
export const of = ((x: unknown) => [x]) as Kind._$reify<Of>
