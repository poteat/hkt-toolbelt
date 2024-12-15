import { Type, Kind, Number, NaturalNumber, String } from '..'

type _$compare3<
  X extends number | string,
  Y extends number | string
> = X extends string
  ? Y extends string
    ? String._$compare<X, Y>
    : // X is a string, Y is a number
      1
  : Y extends string
    ? // X is a number, Y is a string
      -1
    : Number._$compare<X, Y>

type _$compare2<L1 extends unknown[], L2 extends unknown[]> = L1 extends [
  infer H1,
  ...infer T1
]
  ? L2 extends [infer H2, ...infer T2]
    ? [H1, H2] extends [H2, H1]
      ? _$compare2<T1, T2>
      : _$compare3<
          Type._$cast<H1, number | string>,
          Type._$cast<H2, number | string>
        >
    : never
  : 0

/**
 * `_$compare` is a type-level function that compares two lists of strings or
 * numbers. It returns a number indicating the relative order of the two
 * lists.
 *
 * If the two lists are of different lengths, the shorter list is considered
 * less than the longer list.
 *
 * If the two lists are of the same length, the function compares each element
 * in the lists in order, and returns the result of the comparison of the
 * first non-equal elements.
 *
 * All numbers are considered less than all strings.
 *
 * @template L1 - The first list to compare.
 * @template L2 - The second list to compare.
 *
 * @returns A number indicating the relative order of the two lists, -1 if L1 is
 * less than L2, 1 if L1 is greater than L2, and 0 if the lists are equal.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * type Result = List._$compare<['a', 'b'], ['a', 'c']>
 * //    ^? -1
 * ```
 */
export type _$compare<
  L1 extends (string | number)[],
  L2 extends (string | number)[],
  LEN_COMPARE = NaturalNumber._$compare<L1['length'], L2['length']>
> = LEN_COMPARE extends 0 ? _$compare2<L1, L2> : LEN_COMPARE

interface Compare_T<L1 extends (string | number)[]> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], (string | number)[]>): _$compare<L1, typeof x>
}

/**
 * `Compare` is a type-level function that compares two lists of strings or
 * numbers. It returns a number indicating the relative order of the two
 * lists.
 *
 * If the two lists are of different lengths, the shorter list is considered
 * less than the longer list.
 *
 * If the two lists are of the same length, the function compares each element
 * in the lists in order, and returns the result of the comparison of the
 * first non-equal elements.
 *
 * All numbers are considered less than all strings.
 *
 * @template L1 - The first list to compare.
 * @template L2 - The second list to compare.
 *
 * @returns A number indicating the relative order of the two lists, -1 if L1 is
 * less than L2, 1 if L1 is greater than L2, and 0 if the lists are equal.
 *
 * @example
 * ```ts
 * import { $, List } from "hkt-toolbelt";
 *
 * type Result = $<List.Compare, ['a', 'b'], ['a', 'c']>
 * //    ^? -1
 * ```
 */
export interface Compare extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], (string | number)[]>): Compare_T<typeof x>
}

/**
 * Compares two lists of strings or numbers. It returns a number indicating the
 * relative order of the two lists.
 *
 * If the two lists are of different lengths, the shorter list is considered
 * less than the longer list.
 *
 * If the two lists are of the same length, the function compares each element
 * in the lists in order, and returns the result of the comparison of the
 * first non-equal elements.
 *
 * All numbers are considered less than all strings.
 *
 * @param {(string | number)[]} x - The first list to compare.
 * @param {(string | number)[]} y - The second list to compare.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.compare(['a', 'b'], ['a', 'c'])
 * //    ^? -1
 * ```
 */
export const compare = ((x: (string | number)[]) =>
  (y: (string | number)[]) => {
    // First, compare lengths
    if (x.length < y.length) return -1
    if (x.length > y.length) return 1

    // Lengths are equal, compare element-by-element
    for (let i = 0; i < x.length; i++) {
      const a = x[i]
      const b = y[i]

      // If one is number and the other is string
      const aIsNumber = typeof a === 'number'
      const bIsNumber = typeof b === 'number'
      if (aIsNumber && !bIsNumber) return -1 // numbers < strings
      if (!aIsNumber && bIsNumber) return 1 // numbers < strings

      // Both are numbers
      if (aIsNumber && bIsNumber) {
        const diff = a - b
        if (diff < 0) return -1
        if (diff > 0) return 1
        // if diff === 0, continue
      }

      // Both are strings
      if (!aIsNumber && !bIsNumber) {
        const diff = a.localeCompare(b)
        if (diff < 0) return -1
        if (diff > 0) return 1
        // if diff === 0, continue
      }
    }

    // If all elements are equal
    return 0
  }) as Kind._$reify<Compare>
