import { Type, Kind } from '..'

/**
 * `String.Prepend` is a type-level function that prepends a prefix to a string.
 * 
 * @template Prefix - The prefix to prepend.
 * @template S - The string to prepend to.
 * 
 * @example
 * type T0 = String._$prepend<'foo', 'bar'> // 'foobar'
 * type T1 = String._$prepend<'', 'foo'> // 'foo'
 */
export type _$prepend<Prefix extends string, S extends string> = `${Prefix}${S}`

/**
 * `String.Prepend_T` is an intermediate interface for currying.
 */
interface Prepend_T<T extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$prepend<T, typeof x>
}

/**
 * `String.Prepend` is a type-level function that prepends a prefix to a string.
 * 
 * @template Prefix - The prefix to prepend.
 * @template S - The string to prepend to.
 * 
 * @example
 * type T0 = $<$<String.Prepend, 'foo'>, 'bar'> // 'foobar'
 * type T1 = $<$<String.Prepend, ''>, 'foo'> // 'foo'
 */
export interface Prepend extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): Prepend_T<typeof x>
}
