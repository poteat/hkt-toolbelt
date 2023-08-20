import { Number, Integer, Kind, Type } from '..'

/**
 * `_$isLessThanOrEqual` is a type-level function that takes in two integer
 * types, `A` and `B`, and returns a boolean indicating whether `B` is less
 * than or equal to `A`.
 *
 * @param {Number.Number} A - An integer to compare against.
 * @param {Number.Number} B - An integer to compare.
 * @returns {boolean}
 */
export type _$isLessThanOrEqual<
  /**
   * The number to compare against.
   */
  A extends Number.Number,
  /**
   * The number to evaluate.
   */
  B extends Number.Number,
  /**
   * `true` iff `B` is less than or equal to `A`.
   */
  RESULT extends boolean = Integer._$compare<B, A> extends -1 | 0 ? true : false
> = RESULT

interface IsLessThanOrEqual_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): _$isLessThanOrEqual<A, typeof x>
}

/**
 * `IsLessThanOrEqual` is a type-level function that takes in two integer
 * types, `A` and `B`, and returns a boolean indicating whether `B` is less
 * than or equal to `A`.
 *
 * @param {Number.Number} A - An integer to compare against.
 * @param {Number.Number} B - An integer to evaluate.
 * @returns {boolean}
 *
 * The parameters are ordered such that `IsLessThanOrEqual` can be partially applied
 * in a coherent manner. That is, we can apply `IsLessThanOrEqual` to `3`, and have a
 * function `IsLessThanOrEqualToThree`.
 *
 * @example
 * For example, we can use `IsLessThanOrEqual` to determine whether an integer is
 * less than or equal to another integer. In this example, `-3` and `-4` are passed as
 * type arguments to the type-level function:
 *
 * We apply `IsLessThanOrEqual` to `-3`, and then to `-4` respectively using the `$`
 * type-level applicator:
 *
 * ```ts
 * import { $, Integer } from "hkt-toolbelt";
 *
 * type Result = $<$<Integer.IsLessThanOrEqual, -3>, -4>; // true
 * ```
 *
 * @example
 * If we apply `IsLessThanOrEqual` to `-3` and `-3`, we should expect to get `true`.
 *
 * ```ts
 * import { $, Integer } from "hkt-toolbelt";
 *
 * type Result = $<$<Integer.IsLessThanOrEqual, -3>, -3>; // true
 * ```
 *
 * @example
 * If we apply `IsLessThanOrEqual` to `-3` and `4`, we should also expect to get
 * `false`.
 *
 * ```ts
 * import { $, Integer } from "hkt-toolbelt";
 *
 * type Result = $<$<Integer.IsLessThanOrEqual, -3>, 4>; // false
 * ```
 */
export interface IsLessThanOrEqual extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): IsLessThanOrEqual_T<typeof x>
}
