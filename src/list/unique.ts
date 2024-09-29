import { Kind, List, Type } from 'hkt-toolbelt'

/**
 * `_$unique` is a type-level function that returns a new list with all
 * duplicate elements removed.
 *
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
export type _$unique<
  T extends unknown[],
  Result extends unknown[] = []
> = T extends [infer Head, ...infer Tail]
  ? List._$includes<Head, Result> extends true
    ? _$unique<Tail, Result>
    : _$unique<Tail, [...Result, Head]>
  : Result

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
