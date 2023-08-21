import { Type, Kind } from '..'

/**
 * `String.StartsWith` is a type-level function that checks if a string starts with a given prefix.
 *
 * @template Prefix - The prefix to check for.
 * @template S - The string to check.
 *
 * @example
 * type T0 = String._$startsWith<'foo', 'foobar'> // true
 * type T1 = String._$startsWith<'bar', 'foobar'> // false
 */
export type _$startsWith<
  Prefix extends string,
  S extends string
> = S extends `${Prefix}${string}` ? true : false

interface StartsWith_T<Prefix extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$startsWith<Prefix, typeof x>
}

/**
 * `String.StartsWith` is a type-level function that checks if a string starts with a given prefix.
 *
 * @example
 * type T0 = $<$<String.StartsWith, 'foo'>, 'foobar'> // true
 * type T1 = $<$<String.StartsWith, 'bar'>, 'foobar'> // false
 */
export interface StartsWith extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): StartsWith_T<typeof x>
}
