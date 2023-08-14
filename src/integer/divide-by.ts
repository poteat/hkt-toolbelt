import { Kind, Type, Number, Integer } from '..'

interface DivideBy_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true
    ? Integer._$divide<typeof x, A>
    : never
}

/**
 * `DivideBy` is a type-level function that takes in two integer types,
 * `A` and `B`, and returns the result of dividing `B` by `A`.
 *
 * @param {Number.Number} A - An integer to divide by.
 * @param {Number.Number} B - An integer to be divided.
 * @returns {Number.Number} An integer type or `never`.
 *
 * The parameters are reversed from `Divide`. This is useful for partial
 * application, i.e. to test divisibility.
 *
 * @example
 * For example, we can apply `DivideBy` to the type argument 3 using the `$` type-level applicator,
 * and evaluate the results of dividing multiple integers by 3.
 *
 * ```ts
 * import { $, Integer } from "hkt-toolbelt";
 *
 * type DivideByThree = $<Integer.DivideBy, 3>;
 *
 * type Result1 = $<DivideByThree, 4>; // 1
 * type Result2 = $<DivideByThree, -4>; // -1
 * ```
 *
 * @example
 * If one of the inputs is not an integer, `never` is returned.
 *
 * ```ts
 * import { $, Integer } from "hkt-toolbelt";
 *
 * type IsNever = $<Integer.DivideBy, -42.42>; // never
 * ```
 */
export interface DivideBy extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? DivideBy_T<typeof x> : never
}
