import { Type, Kind } from '..'

/**
 * `String._$toUpper` is a type-level function that converts a string to uppercase.
 *
 * @template S - The string to convert to uppercase.
 *
 * @example
 * type T0 = String._$toUpper<'foo'> // 'FOO'
 * type T1 = String._$toUpper<'bar'> // 'BAR'
 */
export type _$toUpper<S extends string> = Uppercase<S>

/**
 * `String.ToUpper` is a type-level function that converts a string to uppercase.
 *
 * @template S - The string to convert to uppercase.
 *
 * @example
 * type T0 = $<String.ToUpper, 'foo'> // 'FOO'
 * type T1 = $<String.ToUpper, 'bar'> // 'BAR'
 */
export interface ToUpper extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$toUpper<typeof x>
}

/**
 * Given a string, convert it to uppercase.
 *
 * @param {string} x - The string to convert to uppercase.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const result = String.toUpper('foo')
 * //    ^? 'FOO'
 * ```
 */
export const toUpper = ((x: string) => x.toUpperCase()) as Kind._$reify<ToUpper>
