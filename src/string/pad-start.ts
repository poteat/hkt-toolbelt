import { Kind, Type, String as String_, Number as Number_, List } from '..'

/**
 * `_$padStart` is a type-level function that takes in a desired length `N`,
 * a padding character `C`, and a string `S`, and returns a new string with
 * the string padded to the desired length with the padding character.
 *
 * If the string is already longer than the desired length, it is returned
 * unchanged.
 *
 * @template {number} N - The desired length of the string.
 * @template {string} C - The padding character.
 * @template {string} S - The string to pad.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * type Result = String._$padStart<8, '0', 'foo'>; // '00000foo'
 * ```
 */
export type _$padStart<
  N extends Number_.Number,
  C extends string,
  S extends string
> = String_._$join<List._$padStart<N, C, String_._$toList<S>>, ''>

export interface PadStart_T2<N extends Number_.Number, C extends string>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$padStart<N, C, typeof x>
}

export interface PadStart_T1<N extends Number_.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): PadStart_T2<N, typeof x>
}

/**
 * `PadStart` is a type-level function that takes in a desired length `N`,
 * a padding character `C`, and a string `S`, and returns a new string with
 * the string padded to the desired length with the padding character.
 *
 * If the string is already longer than the desired length, it is returned
 * unchanged.
 *
 * @template {number} N - The desired length of the string.
 * @template {string} C - The padding character.
 * @template {string} S - The string to pad.
 *
 * @example
 * ```ts
 * import { $, String } from "hkt-toolbelt";
 *
 * type Result = $<$<String.PadStart, 8>, '0', 'foo'>; // '00000foo'
 * ```
 */
export interface PadStart extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number_.Number>): PadStart_T1<typeof x>
}

/**
 * Given a desired length, a padding character, and a string, return a new
 * string with the string padded to the desired length with the padding
 * character.
 *
 * If the string is already longer than the desired length, it is returned
 * unchanged.
 *
 * @param {Number_.Number} n - The desired length of the string.
 * @param {string} c - The padding character.
 * @param {string} s - The string to pad.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const result = String.padStart(8)('0')('foo')
 * //    ^? '00000foo'
 * ```
 */
export const padStart = ((n: Number_.Number) => (c: string) => (s: string) =>
  s.padStart(Number(n), c)) as Kind._$reify<PadStart>
