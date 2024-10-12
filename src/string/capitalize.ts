import _, { Kind, Type } from '..'

/**
 * `String._$capitalize` is a type-level function that capitalizes the first character of a string.
 *
 * @template S - The string to capitalize.
 *
 * @example
 * type T0 = String._$capitalize<'hello'> // 'Hello'
 * type T1 = String._$capitalize<'Hello'> // 'Hello'
 * type T2 = String._$capitalize<''> // ''
 */
export type _$capitalize<S extends string> = Capitalize<S>

/**
 * `String.Capitalize` is a type-level function that capitalizes the first character of a string.
 *
 * @template S - The string to capitalize.
 *
 * @example
 * type T0 = $<String.Capitalize, 'hello'> // 'Hello'
 * type T1 = $<String.Capitalize, 'Hello'> // 'Hello'
 * type T2 = $<String.Capitalize, ''> // ''
 */
interface _Capitalize extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$capitalize<typeof x>
}

export { _Capitalize as Capitalize }

/**
 * Given a string, return a new string with the first letter capitalized.
 *
 * @param {string} x - The string to capitalize.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const result = String.capitalize('hello')
 * //    ^? 'Hello'
 * ```
 */
export const capitalize = ((x: string) =>
  x.charAt(0).toUpperCase() + x.slice(1)) as Kind._$reify<_Capitalize>
