import { Type, Kind } from '..'

/**
 * `String.First` is a type-level function that extracts the first character from a string.
 *
 * @template S - The string to extract the first character from.
 *
 * @example
 * type T0 = String._$first<'hello'> // 'h'
 * type T1 = String._$first<''> // ''
 */
export type _$first<S extends string> = S extends `${infer Head}${string}`
  ? Head
  : string extends S
  ? S
  : ''

/**
 * `String.First` is a type-level function that extracts the first character from a string.
 *
 * @example
 * type T0 = $<String.First, 'hello'> // 'h'
 * type T1 = $<String.First, ''> // ''
 */
export interface First extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$first<typeof x>
}
