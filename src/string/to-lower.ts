import { Type, Kind } from '..'

/**
 * `String.ToLower` is a type-level function that converts a string to lowercase.
 *
 * @template S - The string to convert to lowercase.
 *
 * @example
 * type T0 = String._$toLower<'HELLO'> // 'hello'
 * type T1 = String._$toLower<'WORLD'> // 'world'
 */
export type _$toLower<S extends string> = Lowercase<S>

/**
 * `String.ToLower` is a type-level function that converts a string to lowercase.
 * @template S - The string to convert to lowercase.
 *
 * @example
 * type T0 = $<String.ToLower, 'HELLO'> // 'hello'
 * type T1 = $<String.ToLower, 'WORLD'> // 'world'
 */
export interface ToLower extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$toLower<typeof x>
}
