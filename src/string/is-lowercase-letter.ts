import { Kind, Type } from '..'

type _$lowercaseLetter =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'

/**
 * `_$isLowercaseLetter` is a type-level function that takes in a string `S` and
 * returns a boolean indicating whether the string is a lowercase letter.
 *
 * @template {string} S - The string to check.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * type Result = String._$isLowercaseLetter<'a'>; // true
 * ```
 */
export type _$isLowercaseLetter<S extends string> = S extends _$lowercaseLetter
  ? true
  : false

/**
 * `IsLowercaseLetter` is a type-level function that takes in a string `S` and
 * returns a boolean indicating whether the string is a lowercase letter.
 *
 * @template {string} S - The string to check.
 *
 * @example
 * ```ts
 * import { $, String } from "hkt-toolbelt";
 *
 * type Result = $<String.IsLowercaseLetter, 'a'>; // true
 * ```
 */
export interface IsLowercaseLetter extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$isLowercaseLetter<typeof x>
}

/**
 * Given a string, return a boolean indicating whether the string is a
 * lowercase letter.
 *
 * @param {string} x - The string to check.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const result = String.isLowercaseLetter('a')
 * //    ^? true
 * ```
 */
export const isLowercaseLetter = ((x: string) =>
  x.match(/^[a-z]$/) !== null) as Kind._$reify<IsLowercaseLetter>
