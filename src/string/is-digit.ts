import { Kind, Type } from '..'

type _$digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

/**
 * `_$isDigit` is a type-level function that takes in a string `S` and
 * returns a boolean indicating whether the string is a digit.
 *
 * @template {string} S - The string to check.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * type Result = String._$isDigit<'0'>; // true
 * ```
 */
export type _$isDigit<S extends string> = S extends _$digit ? true : false

/**
 * `IsDigit` is a type-level function that takes in a string `S` and
 * returns a boolean indicating whether the string is a digit.
 *
 * @template {string} S - The string to check.
 *
 * @example
 * ```ts
 * import { $, String } from "hkt-toolbelt";
 *
 * type Result = $<String.IsDigit, '0'>; // true
 * ```
 */
export interface IsDigit extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$isDigit<typeof x>
}

/**
 * Given a string, return a boolean indicating whether the string is a
 * digit.
 *
 * @param {string} x - The string to check.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const result = String.isDigit('0')
 * //    ^? true
 * ```
 */
export const isDigit = ((x: string) =>
  x.match(/^[0-9]$/) !== null) as Kind._$reify<IsDigit>
