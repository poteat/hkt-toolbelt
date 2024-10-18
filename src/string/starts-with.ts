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
 * @template Prefix - The prefix to check for.
 * @template S - The string to check.
 *
 * @example
 * type T0 = $<$<String.StartsWith, 'foo'>, 'foobar'> // true
 * type T1 = $<$<String.StartsWith, 'bar'>, 'foobar'> // false
 */
export interface StartsWith extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): StartsWith_T<typeof x>
}

/**
 * Given a prefix and a string, return whether the string starts with the
 * prefix.
 *
 * @param {string} prefix - The prefix to check for.
 * @param {string} s - The string to check.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const result = String.startsWith('foo')('foobar')
 * //    ^? true
 * ```
 */
export const startsWith = ((prefix: string) => (s: string) =>
  s.startsWith(prefix)) as Kind._$reify<StartsWith>
