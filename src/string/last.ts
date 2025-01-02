import { Type, Kind } from '..'

/**
 * `String._$last` is a type-level function that extracts the last character from a string.
 *
 * @template S - The string to extract the last character from.
 *
 * @example
 * type T0 = String._$last<'foo'> // 'o'
 * type T1 = String._$last<''> // ''
 */
export type _$last<S extends string> = S extends `${string}${infer Tail}`
  ? Tail extends ''
    ? S
    : _$last<Tail>
  : string extends S
    ? S
    : ''

/**
 * `String.Last` is a type-level function that extracts the last character from a string.
 *
 * @template S - The string to extract the last character from.
 *
 * @example
 * type T0 = $<String.Last, 'foo'> // 'o'
 * type T1 = $<String.Last, ''> // ''
 */
export interface Last extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$last<typeof x>
}

/**
 * Given a string, return the last character of the string.
 *
 * @param {string} x - The string to get the last character of.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const T0 = String.last('foo'); // 'o'
 * const T1 = String.last(''); // ''
 * ```
 */
export const last = ((x: string) => x[x.length - 1] ?? '') as Kind._$reify<Last>
