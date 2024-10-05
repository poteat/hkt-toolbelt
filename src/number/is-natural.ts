import { Number as Number_, Type, Kind } from '..'

/**
 * `Number.IsNatural` is a type-level function that checks if a number is a natural number.
 * In mathematics, natural numbers are either defined as positive integers (1, 2, 3, ...) or non-negative integers (0, 1, 2, 3, ...).
 * In this case, we include 0 in the set of natural numbers.
 *
 * @template T - The number to check.
 *
 * @example
 * type T0 = Number._$isNatural<1> // true
 * type T1 = Number._$isNatural<0> // true
 * type T2 = Number._$isNatural<-1> // false
 * type T3 = Number._$isNatural<1.5> // false
 */
export type _$isNatural<T extends Number_.Number> =
  Number_._$isInteger<T> extends true
    ? Number_._$sign<T> extends '+'
      ? true
      : false
    : false

/**
 * `Number.IsNatural` is a type-level function that checks if a number is a natural number.
 * In mathematics, natural numbers are either defined as positive integers (1, 2, 3, ...) or non-negative integers (0, 1, 2, 3, ...).
 * In this case, we include 0 in the set of natural numbers.
 *
 * @template T - The number to check.
 *
 * @example
 * type T0 = $<Number.IsNatural, 1> // true
 * type T1 = $<Number.IsNatural, 0> // true
 * type T2 = $<Number.IsNatural, -1> // false
 * type T3 = $<Number.IsNatural, 1.5> // false
 */
export interface IsNatural extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number_.Number>): _$isNatural<typeof x>
}

/**
 * Given a number, return whether or not it is a natural number.
 *
 * @param {Number_.Number} x - The number to check.
 *
 * @example
 * ```ts
 * import { Number } from "hkt-toolbelt";
 *
 * const result = Number.isNatural(42)
 * //    ^? true
 * ```
 */
export const isNatural = ((x: Number_.Number) =>
  Number.isInteger(Number(x)) && Number(x) >= 0) as Kind._$reify<IsNatural>
