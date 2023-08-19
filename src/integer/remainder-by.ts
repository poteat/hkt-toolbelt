import { Kind, Type, Number, Integer } from '..'

/**
 * `_$remainderBy` is a type-level function that takes in two integer types,
 * `A` and `B`, and returns the remainder of `B` divided by `A`.
 *
 * @param {Number.Number} A - An integer to divide by to calculate the remainder.
 * @param {Number.Number} B - The numerator.
 * @returns {Number.Number} An integer type.
 *
 * The parameters are reversed from `_$remainder`. This is useful for partial
 * application, i.e. to test divisibility.
 */
export type _$remainderBy<
  /**
   * The number to divide by to calculate the remainder.
   */
  A extends Number.Number,
  /**
   * The numerator.
   */
  B extends Number.Number
> = Integer._$remainder<B, A>

interface RemainderBy_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true
    ? _$remainderBy<A, typeof x>
    : never
}

/**
 * `RemainderBy` is a type-level function that takes in two integer types,
 * `A` and `B`, and returns the remainder of `B` divided by `A`.
 *
 * @param {Number.Number} A - An integer to divide by to calculate the remainder.
 * @param {Number.Number} B - The numerator.
 * @returns {Number.Number} An integer type or `never.
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
  f(x: Type._$cast<this[Kind._], Number.Number>): RemainderBy_T<typeof x>
}
