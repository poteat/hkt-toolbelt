import { Kind, Type, Number as Number_, NaturalNumber } from '..'

/**
 * `_$square` is a type-level function that takes in a natural number `N` and
 * returns the square of `N`.
 *
 * @template {Number.Number} N - A natural number.
 *
 * @example
 * For example, we can use `_$square` to compute the square of a natural number:
 *
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = NaturalNumber._$square<42>; // 1684
 * ```
 */
export type _$square<N extends Number_.Number> = NaturalNumber._$multiply<N, N>

/**
 * `Square` is a type-level function that takes in a natural number `N` and
 * returns the square of `N`.
 *
 * @template {Number.Number} N - A natural number.
 *
 * @example
 * For example, we can use `Square` to compute the square of a natural number:
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = $<NaturalNumber.Square, 42>; // 1764
 * ```
 */
export interface Square extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number_.Number>): _$square<typeof x>
}

/**
 * Given a natural number, return the square of the number.
 *
 * @param {Number.Number} x - The natural number to square.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * const result = NaturalNumber.square(42)
 * //    ^? 1764
 * ```
 */
export const square = ((x: Number_.Number) =>
  Number(x) * Number(x)) as Kind._$reify<Square>
