import { String, Type, Kind } from '..'

/**
 * `_$compare` is a type-level function that compares two strings. It returns a
 * number indicating the relative order of the two strings.
 *
 * If the two strings are of different lengths, the shorter string is
 * considered less than the longer string.
 *
 * If the two strings are of the same length, the function compares each
 * character in the strings in order, and returns the result of the comparison
 * of the first non-equal characters.
 *
 * @template S1 - The first string to compare.
 * @template S2 - The second string to compare.
 *
 * @returns A number indicating the relative order of the two strings, -1 if S1
 * is less than S2, 1 if S1 is greater than S2, and 0 if the strings are equal.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * type Result = String._$compare<'foo', 'bar'>
 * //    ^? 1
 * ```
 */
export type _$compare<
  S1 extends string,
  S2 extends string
> = S1 extends `${infer C1}${infer R1}`
  ? S2 extends `${infer C2}${infer R2}`
    ? C1 extends C2
      ? _$compare<R1, R2>
      : String._$compareChar<C1, C2>
    : // S2 ran out, therefore S1 is greater
      1
  : S2 extends ''
    ? // Both strings ran out, therefore they are equal
      0
    : // Only S1 ran out, therefore S1 is less
      -1

interface Compare_T<S1 extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$compare<S1, typeof x>
}

/**
 * `Compare` is a type-level function that compares two strings. It returns a
 * number indicating the relative order of the two strings.
 *
 * If the two strings are of different lengths, the shorter string is
 * considered less than the longer string.
 *
 * If the two strings are of the same length, the function compares each
 * character in the strings in order, and returns the result of the comparison
 * of the first non-equal characters.
 *
 * @template S1 - The first string to compare.
 * @template S2 - The second string to compare.
 *
 * @returns A number indicating the relative order of the two strings, -1 if S1
 * is less than S2, 1 if S1 is greater than S2, and 0 if the strings are equal.
 *
 * @example
 * ```ts
 * import { $, String } from "hkt-toolbelt";
 *
 * type Result = $<String.Compare, 'foo', 'bar'>
 * //    ^? 1
 * ```
 */
export interface Compare extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): Compare_T<typeof x>
}

/**
 * Compares two strings. It returns a number indicating the relative order of
 * the two strings.
 *
 * @param {string} x - The first string to compare.
 * @param {string} y - The second string to compare.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const result = String.compare('foo', 'bar')
 * //    ^? 1
 * ```
 */
export const compare = ((x: string) => (y: string) =>
  x.localeCompare(y)) as Kind._$reify<Compare>
