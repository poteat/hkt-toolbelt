import { Kind, Type, List } from '..'
import { hash } from '../_internal/hash'

/**
 * `_$subtract` is a type-level function that takes in two lists `A` and `B`,
 * and returns a new list containing all elements in `A` that are not in `B`.
 *
 * @template {unknown[]} A - The first list.
 * @template {unknown[]} B - The second list.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * type Result = List._$subtract<[1, 2, 2, 3], [2]>; // [1, 3]
 * ```
 */
export type _$subtract<A extends unknown[], B extends unknown[]> = B extends [
  infer Head,
  ...infer Tail
]
  ? _$subtract<List._$remove<Head, A>, Tail>
  : A

interface Subtract_T<A extends unknown[]> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$subtract<A, typeof x>
}

/**
 * `Subtract` is a type-level function that takes in two lists `A` and `B`,
 * and returns a new list containing all elements in `A` that are not in `B`.
 *
 * @template {unknown[]} A - The first list.
 * @template {unknown[]} B - The second list.
 *
 * @example
 * ```ts
 * type T0 = $<$<List.Subtract, [1, 2, 2, 3]>, [2]> // [1, 3]
 * ```
 */
export interface Subtract extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): Subtract_T<typeof x>
}

/**
 * Given two lists, return a new list containing all elements in `A` that are
 * not in `B`.
 *
 * @param {unknown[]} a - The first list.
 * @param {unknown[]} b - The second list.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.subtract([1, 2, 2, 3])([2])
 * //    ^? [1, 3]
 * ```
 */
export const subtract = ((a: unknown[]) => (b: unknown[]) => {
  const bHashes = new Set(b.map(hash))
  const result: unknown[] = []

  for (const item of a) {
    const hashedItem = hash(item)
    if (!bHashes.has(hashedItem)) {
      result.push(item)
    }
  }

  return result
}) as Kind._$reify<Subtract>
