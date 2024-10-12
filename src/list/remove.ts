import { Conditional, Kind, Type } from '..'
import { deepEqual } from '../_internal/deepEqual'

/**
 * `_$remove` is a type-level function that takes in a value `X` and a list `T`,
 * and returns a new list `T` with all instances of the value `X` removed.
 *
 * @template X - The value to remove.
 * @template T - The list to remove the value from.
 *
 * @returns A new list `T` with all instances of the value `X` removed.
 *
 * @example
 * For example, we can use `_$remove` to remove the value `2` from a list:
 *
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * type Result = List._$remove<2, [1, 2, 3, 2, 4, 2]>; // [1, 3, 4]
 * ```
 */
export type _$remove<
  X,
  T extends unknown[],
  O extends unknown[] = []
> = T extends [infer Head, ...infer Tail]
  ? Conditional._$equals<Head, X> extends true
    ? _$remove<X, Tail, O>
    : _$remove<X, Tail, [...O, Head]>
  : O

interface Remove_T<X> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$remove<X, typeof x>
}

/**
 * `Remove` is a type-level function that takes in a list `T` and a value `X`,
 * and returns a new list `T` with all instances of the value `X` removed.
 *
 * @template T - The list to remove the value from.
 * @template X - The value to remove.
 * @returns A new list `T` with all instances of the value `X` removed.
 *
 * @example
 * For example, we can use `Remove` to remove the value `2` from a list:
 *
 * ```ts
 * import { $, List } from "hkt-toolbelt";
 *
 * type Result = $<$<List.Remove, 2>, [1, 2, 3, 2, 4, 2]>; // [1, 3, 4]
 * ```
 */
export interface Remove extends Kind.Kind {
  f(x: this[Kind._]): Remove_T<typeof x>
}

/**
 * Given a value and a list, return a new list with the value removed.
 *
 * @param {unknown} x - The value to remove.
 * @param {unknown[]} values - The list to remove from.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.remove(2)([1, 2, 3, 2, 4, 2])
 * //    ^? [1, 3, 4]
 * ```
 */
export const remove = ((x: unknown) => (values: unknown[]) =>
  values.filter((value) => !deepEqual(value, x))) as Kind._$reify<Remove>
