import { Kind, Type, DigitList, List } from '..'
import { deepEqual } from '../_internal/deepEqual'

type _$indexOfSequence2<
  X extends unknown[],
  T extends unknown[],
  I extends DigitList.DigitList = ['0']
> = T extends []
  ? -1
  : List._$startsWith<X, T> extends true
    ? DigitList._$toNumber<I>
    : _$indexOfSequence2<X, List._$shift<T>, DigitList._$increment<I>>

/**
 * `_$indexOfSequence` is a type-level function that takes in a list `X` and a
 * list `T`, and returns the index of the first element in `T` such that all
 * elements in `X` are equal to the corresponding element in `T`.
 *
 * Returns `-1` if no sequence in `T` matches `X`.
 *
 * @template {unknown[]} X - The list to find inside of `T`.
 * @template {unknown[]} T - The list to check.
 *
 * @example
 * ```ts
 * type T0 = List._$indexOfSequence<[2, 3], [1, 2, 3]> // 1
 * ```
 */
export type _$indexOfSequence<
  X extends unknown[],
  T extends unknown[]
> = X extends [] ? 0 : _$indexOfSequence2<X, T>

interface IndexOfSequence_T<X extends unknown[]> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$indexOfSequence<X, typeof x>
}

/**
 * `IndexOfSequence` is a type-level function that takes in a list `X` and a
 * list `T`, and returns the index of the first element in `T` such that all
 * elements in `X` are equal to the corresponding element in `T`.
 *
 * Returns `-1` if no sequence in `T` matches `X`.
 *
 * @template {unknown[]} X - The list to find inside of `T`.
 * @template {unknown[]} T - The list to check.
 *
 * @example
 * ```ts
 * type T0 = $<$<List.IndexOfSequence, [2, 3]>, [1, 2, 3]> // 1
 * ```
 */
export interface IndexOfSequence extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): IndexOfSequence_T<typeof x>
}

/**
 * Given two lists, return the index of the subsequence of the second list that
 * matches the first list. Returns `-1` if no subsequence matches.
 *
 * @param {unknown[]} x - The list to find inside of `T`.
 * @param {unknown[]} values - The list to check.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.indexOfSequence([2, 3])([1, 2, 3])
 * //    ^? 1
 * ```
 */
export const indexOfSequence = ((x: unknown[]) => (values: unknown[]) => {
  if (x.length === 0) return 0 // Empty sequence matches at index 0

  // Build the prefix table
  const prefixTable = new Array(x.length).fill(0)
  let j = 0
  for (let i = 1; i < x.length; i++) {
    while (j > 0 && !deepEqual(x[i], x[j])) {
      j = prefixTable[j - 1]
    }
    if (x[i] === x[j]) {
      j++
    }
    prefixTable[i] = j
  }

  // Search using the prefix table
  let i = 0
  j = 0
  while (i < values.length) {
    if (deepEqual(values[i], x[j])) {
      i++
      j++
      if (j === x.length) {
        return i - j // Match found
      }
    } else if (j > 0) {
      j = prefixTable[j - 1]
    } else {
      i++
    }
  }

  return -1 // No match found
}) as Kind._$reify<IndexOfSequence>
