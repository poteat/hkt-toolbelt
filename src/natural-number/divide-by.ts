import { Type, Number as Number_, Kind, NaturalNumber } from '..'

/**
 * Given two natural numbers, divide the second by the first, and return the
 * floored result as a natural number.
 *
 * @param {Number_.Number} A - The denominator.
 * @param {Number_.Number} B - The numerator.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type T0 = NaturalNumber._$divideBy<10, 42>; // 4
 * ```
 */
export type _$divideBy<A extends Number_.Number, B extends Number_.Number> =
  Number_._$isNatural<A> extends true
    ? Number_._$isNatural<B> extends true
      ? NaturalNumber._$divide<B, A>
      : never
    : never

export interface DivideBy_T<A extends Number_.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number_.Number>): _$divideBy<A, typeof x>
}

/**
 * `DivideBy` is a type-level function that takes in two natural number types,
 * `A` and `B`, and returns the result of dividing `B` by `A`.
 *
 * @template {Number_.Number} A - A natural number to divide by.
 * @template {Number_.Number} B - A natural number to be divided.
 * @returns {Number_.Number} A natural number type or `never`.
 *
 * The parameters are reversed from `Divide`. This is useful for partial
 * application, i.e. to test divisibility.
 *
 * @example
 * For example, we can apply `DivideBy` to the type argument 3 using the `$` type-level applicator,
 * and evaluate the results of dividing multiple natural numbers by 3.
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type DivideByThree = $<NaturalNumber.DivideBy, 3>;
 *
 * type Result1 = $<DivideByThree, 3>; // 1
 * type Result2 = $<DivideByThree, 7>; // 2
 * ```
 *
 * @example
 * If one of the inputs is not a natural number, `never` is returned.
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type IsNever = $<NaturalNumber.DivideBy, -42.42>; // never
 * ```
 */
export interface DivideBy extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number_.Number>): DivideBy_T<typeof x>
}

/**
 * Given two natural numbers, divide the second by the first, and return the
 * floored result as a natural number.
 *
 * @param {Number_.Number} A - The denominator.
 * @param {Number_.Number} B - The numerator.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * const T0 = NaturalNumber.divideBy(10)(42); // 4
 * ```
 */
export const divideBy = ((a: Number_.Number) => (b: Number_.Number) =>
  Math.floor(Number(b) / Number(a))) as Kind._$reify<DivideBy>
