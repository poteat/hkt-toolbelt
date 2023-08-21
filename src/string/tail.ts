import { Type, Kind } from '..'

/**
 * `String._$tail` is a type-level function that extracts every element after the first element of a string.
 * 
 * @template S - The string to extract the tail from.
 * 
 * @example
 * type T0 = String._$tail<'hello'> // 'ello'
 * type T1 = String._$tail<''> // ''
 */
export type _$tail<S extends string> = S extends `${string}${infer Tail}`
  ? Tail extends ''
    ? S
    : Tail
  : string extends S
  ? S
  : ''

/**
 * `String.Tail` is a type-level function that extracts every element after the first element of a string.
 * 
 * @example
 * type T0 = $<String.Tail, 'hello'> // 'ello'
 * type T1 = $<String.Tail, ''> // ''
 */
export interface Tail extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$tail<typeof x>
}
