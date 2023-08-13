import { Kind, Type, Number, Integer } from '..'

/**
 * `_$remainderBy` is a type-level function that takes in two integer types,
 * `A` and `B`, and returns the remainder of `B` divided by `A`.
 *
 * @param A The number to divide by to calculate the remainder.
 * @param B The numerator.
 *
 * The parameters are reversed from `_$remainder`. This is useful for partial
 * application, i.e. to test divisibility.
 */
export type _$remainderBy<
  /**
   * The number to divide by to calculate the remainder.
   */
  A extends number,
  /**
   * The numerator.
   */
  B extends number
> = Integer._$remainder<B, A>

interface RemainderBy_T<A extends number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], number>
  ): Number._$isInteger<typeof x> extends true
    ? _$remainderBy<A, typeof x>
    : never
}

/**
 * `RemainderBy` is a type-level function that takes in two integer types,
 * `A` and `B`, and returns the remainder of `B` divided by `A`.
 *
 * @param A The number to divide by to calculate the remainder.
 * @param B The numerator.
 *
 * The parameters are reversed from `Remainder`. This is useful for partial
 * application, i.e. to test divisibility.
 *
 * @example
 * For example, we can use `RemainderBy` to determine the remainder
 * of an integer divided by another integer. In this example, `3` and `4`, `-4` are
 * passed as type arguments to the type-level function:
 *
 * ```ts
 * import { $, Integer } from "hkt-toolbelt";
 *
 * type RemainderByThree = $<Integer.RemainderBy, 3>;
 *
 * type Result1 = $<RemainderByThree, 4>; // 4 % 3 = 1
 * type Result2 = $<RemainderByThree, -4>; // -4 % 3 = -1
 * ```
 */
export interface RemainderBy extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], number>): RemainderBy_T<typeof x>
}
