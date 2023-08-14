import { Type, Number, Kind, NaturalNumber } from '..'

interface SubtractBy_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true
    ? NaturalNumber._$subtract<typeof x, A>
    : never
}

/**
 * `SubtractBy` is a type-level function that takes in two natural number types,
 * `A` and `B`, and returns the result of subtracting `A` from `B`.
 *
 * @param {Number.Number} A - A natural number to subtract by.
 * @param {Number.Number} B - A natural number to be subtracted from.
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
