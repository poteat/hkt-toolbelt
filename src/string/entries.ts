import { Kind, Type, String } from '..'

/**
 * `_$entries` is a type-level function that takes in a string `S`, and returns
 * a list of index-value pairs of the string.
 *
 * @template S - The string to get the entries of.
 *
 * @example
 * ```ts
 * type T0 = _$entries<'foo'> // [[0, 'f'], [1, 'o'], [2, 'o']]
 * ```
 */
export type _$entries<S extends string, SPLIT = String._$split<S, ''>> = {
  [K in keyof SPLIT]: [
    K extends `${infer N extends number}` ? N : never,
    SPLIT[K]
  ]
}

/**
 * `Entries` is a type-level function that takes in a string `S`, and returns
 * a list of index-value pairs of the string.
 *
 * @template S - The string to get the entries of.
 *
 * @example
 * ```ts
 * type T0 = $<String.Entries, 'foo'> // [[0, 'f'], [1, 'o'], [2, 'o']]
 * ```
 */
export interface Entries extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$entries<typeof x>
}

/**
 * Given a string, return a list of index-value pairs.
 *
 * @param {string} x - The string to get the entries of.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const result = String.entries('foo')
 * //    ^? [['0', 'f'], ['1', 'o'], ['2', 'o']]
 * ```
 */
export const entries = ((x: string) =>
  x.split('').map((v, i) => [i, v])) as unknown as Kind._$reify<Entries>
