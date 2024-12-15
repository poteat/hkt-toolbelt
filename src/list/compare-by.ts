import { $, Type, Kind, Number, NaturalNumber, String } from '..'

type $S<F, X> = $<
  Type._$cast<F, Kind.Kind>,
  Type._$cast<X, Kind._$inputOf<Type._$cast<F, Kind.Kind>>>
>

type _$2aryComparator =
  | Kind.Kind<(x: string | number) => Kind.Kind<(y: string | number) => number>>
  | Kind.Kind<(x: string) => Kind.Kind<(y: string) => number>>
  | Kind.Kind<(x: number) => Kind.Kind<(y: number) => number>>

/**
 * Default comparison used when no comparator is available at that index.
 * This is the same fallback logic used by `_$compare` in `List.Compare`.
 */
type _$fallbackCompare<
  X extends number | string,
  Y extends number | string
> = X extends string
  ? Y extends string
    ? String._$compare<X, Y> // both strings
    : 1 // X is string, Y is number => strings > numbers
  : Y extends string
    ? -1 // X is number, Y is string => numbers < strings
    : Number._$compare<X, Y> // both numbers

/**
 * Apply a given 2-ary comparator kind `F` to `X` and `Y`.
 * Return the result as a number. If the result is negative, return -1;
 * if positive, return 1; else return 0.
 */
type _$applyComparator<F extends Kind.Kind, X, Y> = F extends Kind.Kind
  ? $S<$S<F, X>, Y> extends infer R
    ? R extends number
      ? R extends 0
        ? 0
        : `${R}` extends `-${string}`
          ? -1
          : 1
      : never
    : never
  : never

/**
 * Compare two elements at index I using the I-th comparator in FComparators if it exists.
 * Otherwise, use the fallback comparison.
 */
type _$compareByElement<
  FComparators extends readonly _$2aryComparator[],
  I extends number,
  X extends number | string,
  Y extends number | string
> = FComparators[I] extends Kind.Kind
  ? _$applyComparator<FComparators[I], X, Y>
  : _$fallbackCompare<X, Y>

/**
 * Iteratively compare elements of L1 and L2 using the comparator tuple.
 * If at any point elements differ, return that difference.
 * If we reach the end, return 0.
 */
type _$compareBy2<
  FComparators extends readonly _$2aryComparator[],
  L1 extends (number | string)[],
  L2 extends (number | string)[],
  I extends number = 0
> = L1 extends [infer H1, ...infer T1]
  ? L2 extends [infer H2, ...infer T2]
    ? [H1, H2] extends [H2, H1]
      ? _$compareBy2<
          FComparators,
          Type._$cast<T1, (number | string)[]>,
          Type._$cast<T2, (number | string)[]>,
          NaturalNumber._$increment<I>
        >
      : _$compareByElement<
          FComparators,
          I,
          Type._$cast<H1, number | string>,
          Type._$cast<H2, number | string>
        >
    : never
  : 0

/**
 * `_$compareBy` compares two lists using a tuple of 2-ary comparators
 * and fallback comparison logic.
 *
 * If comparators run out, use fallback comparison logic.
 *
 * @param FComparators - Tuple of 2-ary comparators.
 * @param L1 - First list.
 * @param L2 - Second list.
 *
 * @example
 * ```ts
 * import { $, List, Function, NaturalNumber } from 'hkt-toolbelt'
 *
 * type Result = List._$compareBy<
 *   [String.Compare, Number.Compare],
 *   ['foo', 2],
 *   ['bar', 1]
 * > // 1
 */
export type _$compareBy<
  FComparators extends readonly _$2aryComparator[],
  L1 extends (number | string)[],
  L2 extends (number | string)[],
  LEN_COMPARE = NaturalNumber._$compare<L1['length'], L2['length']>
> = LEN_COMPARE extends 0 ? _$compareBy2<FComparators, L1, L2> : LEN_COMPARE

interface CompareBy_T1<
  FComparators extends readonly _$2aryComparator[],
  L1 extends (string | number)[]
> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], (string | number)[]>
  ): _$compareBy<FComparators, L1, typeof x>
}

interface CompareBy_T2<FComparators extends readonly _$2aryComparator[]>
  extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], (string | number)[]>
  ): CompareBy_T1<FComparators, typeof x>
}

/**
 * `CompareBy` is a type-level function that compares two lists of strings or numbers
 * using a tuple of 2-ary comparator kinds.
 *
 * If the lists differ in length, the shorter list is less.
 * If the same length, elements are compared pairwise:
 * - If a comparator is provided at that index, use it.
 * - Otherwise, use the fallback logic (numbers < strings, numeric/string comparison).
 *
 * @template FComparators - A tuple of 2-ary comparators.
 * @template L1 - The first list.
 * @template L2 - The second list.
 *
 * @returns A number: -1 if L1 < L2, 1 if L1 > L2, 0 if equal.
 *
 * @example
 * ```ts
 * import { $, List, Function, NaturalNumber } from 'hkt-toolbelt'
 *
 * type Result = $<$<List.CompareBy, [String.Compare, Number.Compare]>, ['foo', 2], ['bar', 1]>
 * // 1
 * ```
 */
export interface CompareBy extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], readonly _$2aryComparator[]>
  ): CompareBy_T2<typeof x>
}

/**
 * Given a list of comparators, returns a function that compares two lists
 * using the comparators, on a per-element basis.
 *
 * If the lists differ in length, the shorter list is less.
 * If the same length, elements are compared pairwise:
 * - If a comparator is provided at that index, use it.
 * - Otherwise, use the fallback logic (numbers < strings, numeric/string comparison).
 *
 * @param comparators - A tuple of 2-ary comparators.
 * @param L1 - The first list.
 * @param L2 - The second list.
 *
 * @example
 * ```ts
 * import { $, List, Function, NaturalNumber } from 'hkt-toolbelt'
 *
 * const result = List.compareBy([
 *   String.compare,
 *   Number.compare
 * ])(['foo', 2])(['bar', 1]) // 1
 * ```
 */
export const compareBy = ((
    comparators: ((x: number | string) => (y: number | string) => number)[]
  ) =>
  (x: (string | number)[]) =>
  (y: (string | number)[]) => {
    // Compare lengths first
    if (x.length < y.length) return -1
    if (x.length > y.length) return 1

    // Same length, compare pairwise
    for (let i = 0; i < x.length; i++) {
      const a = x[i]
      const b = y[i]

      let result: number
      if (i < comparators.length) {
        // Apply custom comparator
        // Each comparator is a 2-ary kind reified as a function taking `a` then `b`.
        // In runtime form, we assume the comparator returns a number like -1, 0, or 1.
        result = comparators[i](a)(b) as number
      } else {
        // Fallback to default logic
        const aIsNumber = typeof a === 'number'
        const bIsNumber = typeof b === 'number'
        if (aIsNumber && !bIsNumber) result = -1
        else if (!aIsNumber && bIsNumber) result = 1
        else if (aIsNumber && bIsNumber) {
          result = a === b ? 0 : a < b ? -1 : 1
        } else {
          // both are strings
          result = (a as string).localeCompare(b as string)
          result = result < 0 ? -1 : result > 0 ? 1 : 0
        }
      }

      if (result !== 0) return result
    }

    return 0
  }) as Kind._$reify<CompareBy>
