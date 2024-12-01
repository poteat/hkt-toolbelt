import { NaturalNumber, String, Kind, Type } from '..'

/**
 * `_$compareChar` is a type-level function that compares two characters. It
 * returns a number indicating the relative order of the two characters.
 *
 * The character with the lower code point is considered less than the
 * character with the higher code point. If a character is not included in the
 * internal code point table, it returns 'never'.
 *
 * @template C1 - The first character to compare.
 * @template C2 - The second character to compare.
 *
 * @returns A number indicating the relative order of the two characters, -1 if
 * C1 is less than C2, 1 if C1 is greater than C2, and 0 if the characters are
 * equal.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * type Result = String._$compareChar<'a', 'b'>
 * //    ^? -1
 * ```
 */
export type _$compareChar<
  C1 extends string,
  C2 extends string
> = NaturalNumber._$compare<String._$toCharCode<C1>, String._$toCharCode<C2>>

interface CompareChar_T<C1 extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$compareChar<C1, typeof x>
}

/**
 * `CompareChar` is a type-level function that compares two characters. It
 * returns a number indicating the relative order of the two characters.
 *
 * The character with the lower code point is considered less than the
 * character with the higher code point. If a character is not included in the
 * internal code point table, it returns 'never'.
 *
 * @template C1 - The first character to compare.
 * @template C2 - The second character to compare.
 *
 * @returns A number indicating the relative order of the two characters, -1 if
 * C1 is less than C2, 1 if C1 is greater than C2, and 0 if the characters are
 * equal.
 *
 * @example
 * ```ts
 * import { $, String } from "hkt-toolbelt";
 *
 * type Result = $<String.CompareChar, 'a', 'b'>
 * //    ^? -1
 * ```
 */
export interface CompareChar extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): CompareChar_T<typeof x>
}

/**
 * Compares two characters. It returns a number indicating the relative order of
 * the two characters.
 *
 * @param {string} x - The first character to compare.
 * @param {string} y - The second character to compare.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const result = String.compareChar('a', 'b')
 * //    ^? -1
 * ```
 */
export const compareChar = ((x: string) => (y: string) =>
  x.localeCompare(y)) as Kind._$reify<CompareChar>
