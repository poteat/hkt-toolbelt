import { Type, Kind, String } from '..'

/**
 * `String._$length` is a type-level function that returns the length of a string.
 *
 * @template S - The string to get the length of.
 *
 * @example
 * type T0 = String._$length<'hello'> // 5
 * type T1 = String._$length<''> // 0
 */
export type _$length<S extends string> = String._$isTemplate<S> extends true
  ? number
  : string extends S
  ? number
  : String._$toList<S>['length']

/**
 * `String.Length` is a type-level function that returns the length of a string.
 *
 * @template S - The string to get the length of.
 *
 * @example
 * type T0 = $<String.Length, 'hello'> // 5
 * type T1 = $<String.Length, ''> // 0
 */
export interface Length extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$length<typeof x>
}
