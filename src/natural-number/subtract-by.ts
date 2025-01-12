import { Type, Number, Kind, NaturalNumber } from '..'

/**
 * Given two natural numbers, subtract the second from the first, and return the
 * result as a natural number.
 *
 * @param {Number.Number} A - The minuend.
 * @param {Number.Number} B - The subtrahend.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type T0 = NaturalNumber._$subtractBy<10, 42>; // 32
 * ```
 */
export type _$subtractBy<A extends Number.Number, B extends Number.Number> =
  Number._$isNatural<A> extends true
    ? Number._$isNatural<B> extends true
      ? NaturalNumber._$subtract<B, A>
      : never
    : never

export interface SubtractBy_T<A extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$subtractBy<A, typeof x>
}

/**
 * `SubtractBy` is a type-level function that takes in two natural number types,
 * `A` and `B`, and returns the result of subtracting `A` from `B`.
 *
 * @template {Number.Number} A - A natural number to subtract by.
 * @template {Number.Number} B - A natural number to be subtracted from.
 * @returns {Number.Number} A natural number type or `never`.
 *
 * The parameters are reversed from `Subtract`. This is useful for partial
 * application, i.e. to test divisibility.
 *
 * @example
 * For example, we can apply `SubtractBy` to the type argument 3 using the `$` type-level applicator,
 * and evaluate the results of subtracting multiple natural numbers by 3.
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type SubtractByThree = $<NaturalNumber.SubtractBy, 3>;
 *
 * type Result1 = $<SubtractByThree, 3>; // 0
 * type Result2 = $<SubtractByThree, 7>; // 4
 * ```
 *
 * @example
 * If one of the inputs is not a natural number, `never` is returned.
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type IsNever = $<NaturalNumber.SubtractBy, -42.42>; // never
 * ```
 */
export interface SubtractBy extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? SubtractBy_T<typeof x> : never
}

/**
 * Given two natural numbers, subtract the first number from the second. The
 * result is capped at zero.
 *
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * const result = NaturalNumber.subtractBy(2)(3)
 * //    ^? 1
 * ```
 */
export const subtractBy = ((a: number) => (b: number) =>
  a > b ? 0 : b - a) as Kind._$reify<SubtractBy>
