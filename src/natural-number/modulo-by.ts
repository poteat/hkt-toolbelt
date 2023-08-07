import { NaturalNumber, Type, Number, Kind } from "..";

/**
 * `_$moduloBy` is a type-level function that takes in two natural number types,
 * `A` and `B`, and returns the remainder of `B` divided by `A`.
 *
 * ## Parameters
 *
 * @param A The number to divide by to calculate the remainder.
 * @param B The numerator.
 *
 * The parameters are reversed from `_$modulo`. This is useful for partial
 * application, i.e. to test divisibility.
 */
export type _$moduloBy<
  /**
   * The number to divide by to calculate the remainder.
   */
  A extends number,
  /**
   * The numerator.
   */
  B extends number
> = NaturalNumber._$modulo<B, A>;

interface ModuloBy_T<A extends number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], number>
  ): Number._$isNatural<typeof x> extends true
    ? _$moduloBy<A, typeof x>
    : never;
}

/**
 * `ModuloBy` is a type-level function that takes in two natural number types,
 * `A` and `B`, and returns the remainder of `B` divided by `A`.
 *
 * ## Parameters
 *
 * @param A The number to divide by to calculate the remainder.
 * @param B The numerator.
 *
 * The parameters are reversed from `Modulo`. This is useful for partial
 * application, i.e. to test divisibility.
 *
 * ## Usage Examples
 *
 * @example
 * For example, we can use `ModuloBy` to determine the remainder of a natural
 * number divided by another natural number. In this example, `3` and `4` are
 * passed as type arguments to the type-level function:
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type ModuloByThree = $<NaturalNumber.ModuloBy, 3>;
 *
 * type Result = $<ModuloByThree, 4>; // 4 % 3 = 1
 * ```
 */
export interface ModuloBy extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], number>): ModuloBy_T<typeof x>;
}
