import { Kind, Type } from '..'

type _$letter =
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
 * `_$isLetter` is a type-level function that checks if
 *
 * @template {string} S - The string to check.
 *
 * @example
 * ```
 * type T0 = String._$isLetter<'f'> // true
 * type T1 = String._$isLetter<'9'> // false
 * ```
 */
export type _$isLetter<S extends string> = S extends _$letter ? true : false

/**
 * `IsLetter` is a type-level function that checks if a string is a letter.
 *
 * @template {string} S - The string to check.
 *
 * @example
 * ```ts
 * import { $, String } from "hkt-toolbelt";
 *
 * type Result = $<String.IsLetter, 'f'> // true
 * ```
 */
export interface IsLetter extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$isLetter<typeof x>
}

/**
 * Given a string, return whether or not it is a letter.
 *
 * @param {string} x - The string to check.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const result = String.isLetter('f')
 * //    ^? true
 * ```
 */
export const isLetter = ((x: string) =>
  x.match(/^[a-zA-Z]$/) !== null) as Kind._$reify<IsLetter>
