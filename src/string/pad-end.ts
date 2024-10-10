import { Kind, Type, String, Number as Number_, List } from '..'

/**
 * `_$padEnd` is a type-level function that takes in a desired length `N`,
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
 * type Result = String._$padEnd<8, '0', 'foo'>; // 'foo00000'
 * ```
 */
export type _$padEnd<
  N extends Number_.Number,
  C extends string,
  S extends string
> = String._$join<List._$padEnd<N, C, String._$toList<S>>, ''>

export interface PadEnd_T2<N extends Number_.Number, C extends string>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$padEnd<N, C, typeof x>
}

export interface PadEnd_T1<N extends Number_.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): PadEnd_T2<N, typeof x>
}

/**
 * `PadEnd` is a type-level function that takes in a desired length `N`,
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
 * type Result = $<$<String.PadEnd, 8>, '0', 'foo'>; // 'foo00000'
 * ```
 */
export interface PadEnd extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number_.Number>): PadEnd_T1<typeof x>
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
 * const result = String.padEnd(8)('0')('foo')
 * //    ^? 'foo00000'
 * ```
 */
export const padEnd = ((n: Number_.Number) => (c: string) => (s: string) =>
  s.padEnd(Number(n), c)) as Kind._$reify<PadEnd>
