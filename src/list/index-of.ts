import { Kind, Type, DigitList, Conditional } from '..'
import { deepEqual } from '../_internal/deepEqual'

/**
 * `_$indexOf` is a type-level function that takes in a value `X` and a list `T`,
 * and returns the index of the first element in `T` that is equal to `X`.
 * Returns `-1` if no element is equal to `X`.
 *
 * @template {unknown} X - The value to check.
 * @template {unknown[]} T - The list to check.
 *
 * @example
 * ```ts
 * type T0 = List._$indexOf<3, [1, 2, 3]> // 2
 * ```
 */
export type _$indexOf<
  X,
  T extends unknown[],
  I extends DigitList.DigitList = ['0']
> = T extends [infer Head, ...infer Tail]
  ? Conditional._$equals<Head, X> extends true
    ? DigitList._$toNumber<I>
    : _$indexOf<X, Tail, DigitList._$increment<I>>
  : -1

interface IndexOf_T<X> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$indexOf<X, typeof x>
}

/**
 * `IndexOf` is a type-level function that takes in a value `X` and a list `T`,
 * and returns the index of the first element in `T` that is equal to `X`.
 * Returns `-1` if no element is equal to `X`.
 *
 * @template {unknown} X - The value to check.
 * @template {unknown[]} T - The list to check.
 *
 * @example
 * ```ts
 * type T0 = $<$<List.IndexOf, 3>, [1, 2, 3]> // 2
 * ```
 */
export interface IndexOf extends Kind.Kind {
  f(x: this[Kind._]): IndexOf_T<typeof x>
}

/**
 * Given a value and a list, return the index of the first element in the list
 * that is equal to the value. Returns `-1` if no element is equal to the value.
 *
 * @param {unknown} x - The value to check.
 * @param {unknown[]} values - The list to check.
 *
 * @example
 * ```ts
 * import { List, String } from "hkt-toolbelt";
 *
 * const result = List.indexOf('foo')(['foo', 'bar'])
 * //    ^? 0
 * ```
 */
export const indexOf = ((x: unknown) => (values: unknown[]) => {
  for (let i = 0; i < values.length; i++) {
    if (deepEqual(values[i], x)) return i
  }

  return -1
}) as Kind._$reify<IndexOf>
