import { Kind, List, Type } from '..'
import { hash } from '../_internal/hash'

type _$unique2<T extends unknown[], Result extends unknown[] = []> = T extends [
  infer Head,
  ...infer Tail
]
  ? List._$includes<Head, Result> extends true
    ? _$unique2<Tail, Result>
    : _$unique2<Tail, [...Result, Head]>
  : Result

/**
 * `_$unique` is a type-level function that returns a new list with all
 * duplicate elements removed.
 *refd
 * @template {unknown[]} T The input list.
 *
 * @example
 * ```ts
 * import { List } from 'hkt-toolbelt'
 *
 * type Result = List._$unique<[1, 2, 3, 2, 1]>
 * //   ^? [1, 2, 3]
 * ```
 */
export type _$unique<T extends unknown[]> = [List._$isVariadic<T>] extends [
  true
]
  ? T
  : _$unique2<T>

/**
 * Returns a new list with all duplicate elements removed.
 *
 * @template {unknown[]} T The input list.
 *
 * @example
 * ```ts
 * import { $, List } from 'hkt-toolbelt'
 *
 * type Result = $<List.Unique, [1, 2, 3, 2, 1]>
 * //   ^? [1, 2, 3]
 * ```
 */
export interface Unique extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$unique<typeof x>
}

/**
 * Given a list, return a new list with all duplicate elements removed.
 *
 * @param {unknown[]} x - The list to remove duplicates from.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.unique([1, 2, 3, 2, 1])
 * //    ^? [1, 2, 3]
 * ```
 */
export const unique = ((x: unknown[]) => {
  const seen = new Set<string>()
  const unique: unknown[] = []

  for (const element of x) {
    const h = hash(element)

    if (!seen.has(h)) {
      seen.add(h)
      unique.push(element)
    }
  }

  return unique
}) as Kind._$reify<Unique>
