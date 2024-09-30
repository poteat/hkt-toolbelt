import { Kind, Type } from '..'

/**
 * `_$unshiftValue` is a type-level function that takes in a list `T`, a value
 * `X`, and returns a new list with `X` unshifted onto `T`, i.e. placed at the
 * beginning of `T`.
 *
 * This is an argument swapped version of `List._$unshift`.
 *
 * @template {unknown[]} T - The list to unshift the value onto.
 * @template {unknown} X - The value to unshift onto `T`.
 *
 * @example
 * ```ts
 * type T0 = _$unshiftValue<[1, 2, 3], 4> // [4, 1, 2, 3]
 * ```
 */
export type _$unshiftValue<T extends unknown[], X> = [X, ...T]

interface UnshiftValue_T<X extends unknown[]> extends Kind.Kind {
  f(x: this[Kind._]): _$unshiftValue<X, typeof x>
}

/**
 * `UnshiftValue` is a type-level function that takes in a list `T`, a value
 * `X`, and returns a new list with `X` unshifted onto `T`, i.e. placed at the
 * beginning of `T`.
 *
 * This is an argument swapped version of `List.Unshift`.
 *
 * @template {unknown[]} T - The list to unshift the value onto.
 * @template {unknown} X - The value to unshift onto `T`.
 *
 * @example
 * ```ts
 * type T0 = $<$<List.UnshiftValue, [1, 2, 3]>, 4> // [4, 1, 2, 3]
 * ```
 */
export interface UnshiftValue extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): UnshiftValue_T<typeof x>
}

/**
 * Given a list and a value, unshift the value onto the start of the list.
 *
 * @param {unknown[]} values - The list to unshift the value onto.
 * @param {unknown} x - The value to unshift onto the list.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.unshiftValue([1, 2, 3])(4)
 * //    ^? [4, 1, 2, 3]
 * ```
 */
export const unshiftValue = ((values: unknown[]) => (x: unknown) => [
  x,
  ...values
]) as Kind._$reify<UnshiftValue>
