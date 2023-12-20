import { Kind, Type, Number, Integer } from '..'

interface SubtractBy_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true
    ? Integer._$subtract<typeof x, A>
    : never
}

/**
 * `SubtractBy` is a type-level function that takes in two integer types,
 * `A` and `B`, and returns the result of subtracting `A` from `B`.
 *
 * @template {Number.Number} A - An integer to subtract by.
 * @template {Number.Number} B - An integer to be subtracted from.
 * @returns {Number.Number} An integer type or `never`.
 *
 * The parameters are reversed from `Subtract`. This is useful for partial
 * application, i.e. to test divisibility.
 *
 * @example
 * For example, we can apply `SubtractBy` to the type argument 3 using the `$` type-level applicator,
 * and evaluate the results of subtracting multiple integers by 3.
 *
 * ```ts
 * import { $, Integer } from "hkt-toolbelt";
 *
 * type SubtractByThree = $<Integer.SubtractBy, 3>;
 *
 * type Result1 = $<SubtractByThree, 4>; // 1
 * type Result2 = $<SubtractByThree, -4>; // -7
 * ```
 *
 * @example
 * If one of the inputs is not an integer, `never` is returned.
 *
 * ```ts
 * import { $, Integer } from "hkt-toolbelt";
 *
 * type IsNever = $<Integer.SubtractBy, -42.42>; // never
 * ```
 */
export interface SubtractBy extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? SubtractBy_T<typeof x> : never
}
