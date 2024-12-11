import { Type, Kind, Number, NaturalNumber } from '..'

/**
 * `_$repeat` is a type-level function that takes in a string `S` and a natural number `N`.
 * It returns the string `S` repeated `N` times. If `N` is not a natural number, `never` is returned.
 *
 * This version uses a tail-recursive style by introducing an accumulator parameter `ACC`.
 *
 * @template {string} S - The string to repeat.
 * @template {Number.Number} N - The natural number of times to repeat the string.
 * @template {string} ACC - An accumulator string used in recursion.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * type R1 = String._$repeat<"abc", 3>; // "abcabcabc"
 * type R2 = String._$repeat<"x", 0>;   // ""
 * type R3 = String._$repeat<"foo", -1>; // never
 * type R4 = String._$repeat<"bar", 1.5>; // never
 * ```
 */
export type _$repeat<
  S extends string,
  N extends Number.Number,
  ACC extends string = ''
> =
  Number._$isNatural<N> extends true
    ? N extends 0
      ? ACC
      : _$repeat<S, NaturalNumber._$decrement<N>, `${ACC}${S}`>
    : never

interface Repeat_T<S extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$repeat<S, typeof x>
}

/**
 * `Repeat` is a type-level function that takes in a string `S` and a natural number `N`.
 * It returns the string `S` repeated `N` times. If `N` is not a natural number, `never` is returned.
 *
 * @template {string} S - The string to repeat.
 * @template {Number.Number} N - The natural number of times to repeat the string.
 *
 * @example
 * ```ts
 * import { $, String } from "hkt-toolbelt";
 *
 * type Result = $<$<String.Repeat, "abc">, 3>; // "abcabcabc"
 * ```
 */
export interface Repeat extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): Repeat_T<typeof x>
}

/**
 * Given a string and a natural number, return a new string with the original string repeated `N` times.
 *
 * @param {string} s - The string to repeat.
 * @param {number} n - The number of times to repeat the string.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const result = String.repeat("abc")(3);
 * //    ^? "abcabcabc"
 * ```
 */
export const repeat = ((s: string) => (n: number) =>
  Number.isNatural(n) ? s.repeat(n) : Type.never) as Kind._$reify<Repeat>
