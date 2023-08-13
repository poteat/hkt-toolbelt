import { Kind, Type, Number, Integer } from '..'

/**
 * `_$moduloBy` is a type-level function that takes in two integer types,
 * `A` and `B`, and returns the floored modulo of `B` divided by `A`.
 *
 * @param A The number to divide by to calculate the remainder.
 * @param B The numerator.
 *
 * The parameters are reversed from `_$modulo`. This is useful for partial
 * application, i.e. to test divisibility.
 */
export type _$moduloBy<
  /**
   * The number to divide by to calculate the modulo.
   */
  A extends number,
  /**
   * The numerator.
   */
  B extends number
> = Integer._$modulo<B, A>

interface ModuloBy_T<A extends number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], number>
  ): Number._$isInteger<typeof x> extends true ? _$moduloBy<A, typeof x> : never
}

/**
 * `ModuloBy` is a type-level function that takes in two integer types,
 * `A` and `B`, and returns the floored modulo of `B` divided by `A`.
 *
 * @param A The number to divide by to calculate the modulo.
 * @param B The numerator.
 *
 * The parameters are reversed from `Modulo`. This is useful for partial
 * application, i.e. to test divisibility.
 *
 * @example
 * For example, we can use `ModuloBy` to determine the remainder
 * of an integer divided by another integer. In this example, `3` and `4`, `-4` are
 * passed as type arguments to the type-level function:
 *
 * ```ts
 * import { $, Integer } from "hkt-toolbelt";
 *
 * type ModuloByThree = $<Integer.ModuloBy, 3>;
 *
 * type Result = $<ModuloByThree, 4>; // 1
 * type Result = $<ModuloByThree, -4>; // 3
 * ```
 */
export interface ModuloBy extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], number>): ModuloBy_T<typeof x>
}
