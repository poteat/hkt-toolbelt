import { Kind, List, Type } from '..'
import { hash } from '../_internal/hash'

/**
 * `_$intersect` is a type-level function that takes in two lists `A` and `B`,
 * and returns a list of the elements that are common to both lists.
 *
 * Elements are ordered in the same order as the first list.
 *
 * @template A - The first list.
 * @template B - The second list.
 * @template T - The common elements.
 *
 * @example
 * For example, we can use `_$intersect` to find the common elements in two lists:
 *
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * type Result = List._$intersect<[1, 2, 3], [1, 2, 3, 4, 5]>; // [1, 2, 3]
 * ```
 */
export type _$intersect<
  A extends unknown[],
  B extends unknown[],
  O extends unknown[] = []
> = 0 extends 1
  ? never
  : A extends [infer Head, ...infer Tail]
    ? List._$includes<Head, B> extends true
      ? _$intersect<Tail, B, [...O, Head]>
      : _$intersect<Tail, B, O>
    : O

interface Intersect_T<A extends unknown[]> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$intersect<A, typeof x>
}

/**
 * `Intersect` is a type-level function that takes in two lists `A` and `B`,
 * and returns a list of the elements that are common to both lists.
 *
 * Elements are ordered in the same order as the first list.
 *
 * @template A - The first list.
 * @template B - The second list.
 * @template T - The common elements.
 *
 * @example
 * For example, we can use `Intersect` to find the common elements in two lists:
 *
 * ```ts
 * import { $, List } from "hkt-toolbelt";
 *
 * type Result = $<$<List.Intersect, [1, 2, 3]>, [1, 3, 4, 5]>; // [1, 3]
 * ```
 */
export interface Intersect extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): Intersect_T<typeof x>
}

/**
 * Given two lists, return the elements that are common to both lists.
 *
 * @param {unknown[]} a - The first list.
 * @param {unknown[]} b - The second list.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.intersect([1, 2, 3])([1, 3, 4, 5])
 * //    ^? [1, 3]
 * ```
 */
export const intersect = ((a: unknown[]) => (b: unknown[]) => {
  const aHashes = new Set(a.map(hash))
  const result: unknown[] = []

  for (const item of b) {
    const hashedItem = hash(item)
    if (aHashes.has(hashedItem)) {
      result.push(item)
    }
  }

  return result
}) as Kind._$reify<Intersect>
