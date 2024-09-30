import { Type, Kind } from '..'

/**
 * `String._$append` is a type-level function that appends a suffix to a string.
 *
 * @template Suffix - The string to append.
 * @template S - The original string.
 *
 * @example
 * type T0 = String._$append<'bar', 'foo'> // 'foobar'
 * type T1 = String._$append<'', 'foo'> // 'foo'
 */
export type _$append<Suffix extends string, S extends string> = `${S}${Suffix}`

interface Append_T<Suffix extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$append<Suffix, typeof x>
}

/**
 * `String.Append` is a type-level function that appends a suffix to a string.
 *
 * @template Suffix - The string to append.
 * @template S - The original string.
 *
 * @example
 * type T0 = $<$<String.Append, 'bar'>, 'foo'> // 'foobar'
 * type T1 = $<$<String.Append, ''>, 'foo'> // 'foo'
 */
export interface Append extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): Append_T<typeof x>
}

/**
 * Given a suffix and a string, append the suffix to the string.
 *
 * @param {string} suffix - The suffix to append.
 * @param {string} s - The string to append the suffix to.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const result = String.append('bar')('foo')
 * //    ^? foobar
 * ```
 */
export const append = ((suffix: string) => (s: string) =>
  s + suffix) as Kind._$reify<Append>
