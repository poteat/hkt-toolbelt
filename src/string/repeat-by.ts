import { Type, Kind, Number, String } from '..'

/**
 * Given a natural number and a string, return a string with the original string
 * repeated that number of times.
 *
 * This is an argument swapped version of `String._$repeat`.
 *
 * @param {Number.Number} N - The number of times to repeat the string.
 * @param {string} S - The string to repeat.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * type T0 = String._$repeatBy<3, 'foo'>; // 'foofoofoo'
 * type T1 = String._$repeatBy<0, 'foo'>; // ''
 * ```
 */
export type _$repeatBy<
  N extends Number.Number,
  S extends string
> = String._$repeat<S, N>

export interface RepeatBy_T<N extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$repeatBy<N, typeof x>
}

/**
 * Given a natural number and a string, return a string with the original string
 * repeated that number of times.
 *
 * This is an argument swapped version of `String._$repeat`.
 *
 * @param {Number.Number} N - The number of times to repeat the string.
 * @param {string} S - The string to repeat.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * type T0 = $<$<String.RepeatBy, 3>, 'foo'>; // 'foofoofoo'
 * type T1 = $<$<String.RepeatBy, 0>, 'foo'>; // ''
 * ```
 */
export interface RepeatBy extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): RepeatBy_T<typeof x>
}

/**
 * Given a natural number and a string, return a string with the original string
 * repeated that number of times.
 *
 * This is an argument swapped version of `String._$repeat`.
 *
 * @param {Number.Number} N - The number of times to repeat the string.
 * @param {string} S - The string to repeat.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const T0 = String.repeatBy(3)('foo'); // 'foofoofoo'
 * const T1 = String.repeatBy(0)('foo'); // ''
 * ```
 */
export const repeatBy = ((n: Number.Number) => (s: string) =>
  String.repeat(s)(n as string)) as Kind._$reify<RepeatBy>
