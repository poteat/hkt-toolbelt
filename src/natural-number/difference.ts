import { Kind, Type, Number as Number_, NaturalNumber } from '..'

/**
 * `_$difference` is a type-level function that takes in two natural numbers
 * `A` and `B`, and returns the absolute difference between `A` and `B`.
 *
 * @template {Number.Number} A - A natural number.
 * @template {Number.Number} B - A natural number.
 *
 * @example
 * For example, we can use `_$difference` to compute the absolute difference between two natural numbers:
 *
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = NaturalNumber._$difference<42, 10>; // 32
 * ```
 */
export type _$difference<A extends Number_.Number, B extends Number_.Number> =
  NaturalNumber._$isGreaterThan<A, B> extends true
    ? NaturalNumber._$subtract<B, A>
    : NaturalNumber._$subtract<A, B>

export interface Difference_T<A extends Number_.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number_.Number>): _$difference<A, typeof x>
}

/**
 * `Difference` is a type-level function that takes in two natural numbers
 * `A` and `B`, and returns the absolute difference between `A` and `B`.
 *
 * @template {Number.Number} A - A natural number.
 * @template {Number.Number} B - A natural number.
 *
 * @example
 * For example, we can use `Difference` to compute the absolute difference
 * between two natural numbers:
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = $<$<NaturalNumber.Difference, 42>, 10>; // 32
 * ```
 */
export interface Difference extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number_.Number>): Difference_T<typeof x>
}

/**
 * Given two natural numbers, return the absolute difference between them.
 *
 * @param {Number.Number} a - The first natural number.
 * @param {Number.Number} b - The second natural number.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * const result = NaturalNumber.difference(42)(10)
 * //    ^? 32
 * ```
 */
export const difference = ((a: Number_.Number) => (b: Number_.Number) => {
  const numA = Number(a)
  const numB = Number(b)

  return numA > numB ? numA - numB : numB - numA
}) as Kind._$reify<Difference>
