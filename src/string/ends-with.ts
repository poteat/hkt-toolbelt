import { Type, Kind } from '..'

/**
 * `String.EndsWith` is a type-level function that checks if a string ends with a given suffix.
 *
 * @template Suffix - The suffix to check for.
 * @template S - The string to check.
 *
 * @example
 * type T0 = String._$endsWith<'bar', 'foobar'> // true
 * type T1 = String._$endsWith<'foo', 'foobar'> // false
 */
export type _$endsWith<
  Suffix extends string,
  S extends string
> = S extends `${string}${Suffix}` ? true : false

interface EndsWith_T<T extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$endsWith<T, typeof x>
}

/**
 * `String.EndsWith` is a type-level function that checks if a string ends with a given suffix.
 *
 * @template Suffix - The suffix to check for.
 * @template S - The string to check.
 *
 * @example
 * type T0 = $<$<String.EndsWith, 'bar'>, 'foobar'> // true
 * type T1 = $<$<String.EndsWith, 'foo'>, 'foobar'> // false
 */
export interface EndsWith extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): EndsWith_T<typeof x>
}

/**
 * Given a suffix and a string, return whether the string ends with the
 * suffix.
 *
 * @param {string} suffix - The suffix to check for.
 * @param {string} s - The string to check.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const result = String.endsWith('bar')('foobar')
 * //    ^? true
 * ```
 */
export const endsWith = ((suffix: string) => (s: string) =>
  s.endsWith(suffix)) as Kind._$reify<EndsWith>
