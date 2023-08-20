import { Number, Kind, Type } from '..'

/**
 * `_$isLessThanOrEqual` is a type-level function that takes in two number
 * types, `A` and `B`, and returns a boolean indicating whether `B` is less
 * than or equal to `A`.
 *
 * @param {Number.Number} A - A number to compare against.
 * @param {Number.Number} B - A number to compare.
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
  RESULT extends boolean = Number._$compare<B, A> extends -1 | 0 ? true : false
> = RESULT

interface IsLessThanOrEqual_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): _$isLessThanOrEqual<A, typeof x>
}

/**
 * `IsLessThanOrEqual` is a type-level function that takes in two number
 * types, `A` and `B`, and returns a boolean indicating whether `B` is less
 * than or equal to `A`.
 *
 * @param {Number.Number} A - A number to compare against.
 * @param {Number.Number} B - A number to evaluate.
 * @returns {boolean}
 *
 * The parameters are ordered such that `IsLessThanOrEqual` can be partially applied
 * in a coherent manner. That is, we can apply `IsLessThanOrEqual` to `3`, and have a
 * function `IsLessThanOrEqualToThree`.
 *
 * @example
 * For example, we can use `IsLessThanOrEqual` to determine whether an number is
 * less than or equal to another number. In this example, `-3` and `-4` are passed as
 * type arguments to the type-level function:
 *
 * We apply `IsLessThanOrEqual` to `-3`, and then to `-3.1` respectively using the `$`
 * type-level applicator:
 *
 * ```ts
 * import { $, Number } from "hkt-toolbelt";
 *
 * type Result = $<$<Number.IsLessThanOrEqual, -3>, -3.1>; // true
 * ```
 *
 * @example
 * If we apply `IsLessThanOrEqual` to `-3` and `-3`, we should expect to get `true`.
 *
 * ```ts
 * import { $, Number } from "hkt-toolbelt";
 *
 * type Result = $<$<Number.IsLessThanOrEqual, -3>, -3>; // true
 * ```
 *
 * @example
 * If we apply `IsLessThanOrEqual` to `-3` and `3.1`, we should also expect to get
 * `false`.
 *
 * ```ts
 * import { $, Number } from "hkt-toolbelt";
 *
 * type Result = $<$<Number.IsLessThanOrEqual, -3>, 3.1>; // false
 * ```
 */
export interface IsLessThanOrEqual extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): IsLessThanOrEqual_T<typeof x>
}
