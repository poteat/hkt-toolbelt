import { Kind, Type, List } from '..'

/**
 * `_$entries` is a type-level function that takes in a list `T`, and returns
 * a list of index-value pairs of the list.
 *
 * @template T - The list to get the entries of.
 *
 * @example
 * ```ts
 * type T0 = _$entries<[1, 2, 3]> // [[0, 1], [1, 2], [2, 3]]
 * ```
 */
export type _$entries<T extends List.List> = {
  [K in keyof T]: [K extends `${infer N extends number}` ? N : never, T[K]]
}

/**
 * `Entries` is a type-level function that takes in a list `T`, and returns
 * a list of index-value pairs of the list.
 *
 * @template T - The list to get the entries of.
 *
 * @example
 * ```ts
 * type T0 = $<List.Entries, [1, 2, 3]> // [[0, 1], [1, 2], [2, 3]]
 * ```
 */
export interface Entries extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], List.List>): _$entries<typeof x>
}

/**
 * Given a list, return a list of index-value pairs.
 *
 * @param {List.List} x - The list to get the entries of.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.entries([1, 2, 3])
 * //    ^? [[0, 1], [1, 2], [2, 3]]
 * ```
 */
export const entries = ((x: List.List) =>
  x.map((v, i) => [i, v])) as unknown as Kind._$reify<Entries>
