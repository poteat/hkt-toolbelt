import { Type, Number, Kind, NaturalNumber } from '..'

interface DivideBy_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true
    ? NaturalNumber._$divide<typeof x, A>
    : never
}

/**
 * `DivideBy` is a type-level function that takes in two natural number types,
 * `A` and `B`, and returns the result of dividing `B` by `A`.
 *
 * @template {Number.Number} A - A natural number to divide by.
 * @template {Number.Number} B - A natural number to be divided.
 * @returns {Number.Number} A natural number type or `never`.
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
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? DivideBy_T<typeof x> : never
}
