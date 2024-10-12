import { Kind, Type } from '..'

type _$uppercaseLetter =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'

/**
 * `_$isUppercaseLetter` is a type-level function that takes in a string `S` and
 * returns a boolean indicating whether the string is an uppercase letter.
 *
 * @template {string} S - The string to check.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * type Result = String._$isUppercaseLetter<'A'>; // true
 * ```
 */
export type _$isUppercaseLetter<S extends string> = S extends _$uppercaseLetter
  ? true
  : false

/**
 * `IsUppercaseLetter` is a type-level function that takes in a string `S` and
 * returns a boolean indicating whether the string is an uppercase letter.
 *
 * @template {string} S - The string to check.
 *
 * @example
 * ```ts
 * import { $, String } from "hkt-toolbelt";
 *
 * type Result = $<String.IsUppercaseLetter, 'A'>; // true
 * ```
 */
export interface IsUppercaseLetter extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$isUppercaseLetter<typeof x>
}

/**
 * Given a string, return a boolean indicating whether the string is an
 * uppercase letter.
 *
 * @param {string} x - The string to check.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const result = String.isUppercaseLetter('A')
 * //    ^? true
 * ```
 */
export const isUppercaseLetter = ((x: string) =>
  x.match(/^[A-Z]$/) !== null) as Kind._$reify<IsUppercaseLetter>
