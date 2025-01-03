import { Type, Kind } from '..'

/**
 * Given a list of words, combine them into a single string, separated by spaces.
 *
 * @param {string[]} x - The list of words to join.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const T0 = String._$unwords<['foo', 'bar']> // 'foo bar'
 * ```
 */
export type _$unwords<S extends string[]> = S extends [
  infer Head extends string,
  ...infer Tail extends string[]
]
  ? Tail extends []
    ? Head
    : `${Head} ${_$unwords<Tail>}`
  : ''

/**
 * Given a list of words, combine them into a single string, separated by spaces.
 *
 * @param {string[]} x - The list of words to join.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const T0 = $<String.Unwords, ['foo', 'bar']> // 'foo bar'
 * ```
 */
export interface Unwords extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string[]>): _$unwords<typeof x>
}

/**
 * Given a list of words, combine them into a single string, separated by spaces.
 *
 * @param {string[]} x - The list of words to join.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const T0 = $<$<String.Unwords, ['foo', 'bar']> // 'foo bar'
 * ```
 */
export const unwords = ((x: string[]) => x.join(' ')) as Kind._$reify<Unwords>
