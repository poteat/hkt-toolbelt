import { Kind, Type, List } from '..'
import { hash } from '../_internal/hash'

/**
 * `_$subtractBy` is a type-level function that takes in two lists `A` and `B`,
 * and returns a new list containing all elements in `B` that are not in `A`.
 *
 * @template {unknown[]} A - The first list.
 * @template {unknown[]} B - The second list.
 *
 * @example
 * ```ts
 * import { List, String } from "hkt-toolbelt";
 *
 * type Result = List._$subtractBy<[2], [1, 2, 2, 3]>; // [1, 3]
 * ```
 */
export type _$subtractBy<
  A extends unknown[],
  B extends unknown[]
> = List._$subtract<B, A>

interface SubtractBy_T<A extends unknown[]> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$subtractBy<A, typeof x>
}

/**
 * `SubtractBy` is a type-level function that takes in two lists `A` and `B`,
 * and returns a new list containing all elements in `B` that are not in `A`.
 *
 * @template {unknown[]} A - The first list.
 * @template {unknown[]} B - The second list.
 *
 * @example
 * ```ts
 * type T0 = $<$<List.SubtractBy, [2]>, [1, 2, 2, 3]> // [1, 3]
 * ```
 */
export interface SubtractBy extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): SubtractBy_T<typeof x>
}

/**
 * Given two lists, return a new list containing all elements in `b` that are
 * not in `a`.
 *
 * @param {unknown[]} a - The first list.
 * @param {unknown[]} b - The second list.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.subtractBy([2])([1, 2, 2, 3])
 * //    ^? [1, 3]
 * ```
 */
export const subtractBy = ((a: unknown[]) => (b: unknown[]) => {
  const aHashes = new Set(a.map(hash))
  const result: unknown[] = []

  for (const item of b) {
    const hashedItem = hash(item)
    if (!aHashes.has(hashedItem)) {
      result.push(item)
    }
  }

  return result
}) as Kind._$reify<SubtractBy>
