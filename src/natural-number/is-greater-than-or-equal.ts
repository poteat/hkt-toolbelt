import { Number, NaturalNumber, Kind, Type } from '..'

/**
 * `_$isGreaterThanOrEqual` is a type-level function that takes in two natural number
 * types, `A` and `B`, and returns a boolean indicating whether `B` is greater
 * than or equal to `A`.
 *
 * This function works by comparing the ordinal values of `A` and `B`. If `B`
 * has a lower or equal ordinal value than `A`, then `B` is greater than or equal to `A`.
 *
 * @param {Number.Number} A - The natural number to compare against.
 * @param {Number.Number} B - The natural number to compare.
 * @returns {boolean}
 */
export type _$isGreaterThanOrEqual<
  /**
   * The number to compare against.
   */
  A extends Number.Number,
  /**
   * The number to evaluate.
   */
  B extends Number.Number,
  /**
   * `true` iff `B` is greater than or equal to `A`.
   */
  RESULT extends boolean = NaturalNumber._$compare<B, A> extends 1 | 0
    ? true
    : false
> = RESULT

interface IsGreaterThanOrEqual_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): _$isGreaterThanOrEqual<A, typeof x>
}

/**
 * `IsGreaterThanOrEqual` is a type-level function that takes in two natural number
 * types, `A` and `B`, and returns a boolean indicating whether `B` is greater
 * than or equal to `A`.
 *
 * @param {Number.Number} A The natural number to compare against.
 * @param {Number.Number} B The natural number to compare.
 * @returns {boolean}
 *
 * The parameters are ordered such that `IsGreaterThanOrEqual` can be partially applied
 * in a coherent manner. That is, we can apply `IsGreaterThanOrEqual` to `3`, and have a
 * function `IsGreaterThanOrEqualToThree`.
 *
 * @example
 * For example, we can use `IsGreaterThanOrEqual` to determine whether a natural number is
 * greater than another natural number. In this example, `3` and `4` are passed as
 * type arguments to the type-level function:
 *
 * We apply `IsGreaterThanOrEqual` to `3`, and then to `4` respectively using the `$`
 * type-level applicator:
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = $<$<NaturalNumber.IsGreaterThanOrEqual, 3>, 4>; // true
 * ```
 *
 * @example
 * If we apply `IsGreaterThanOrEqual` to `3` and `3`, we should expect to get `true`.
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = $<$<NaturalNumber.IsGreaterThanOrEqual, 3>, 3>; // true
 * ```
 *
 * @example
 * If we apply `IsGreaterThanOrEqual` to `3` and `2`, we should also expect to get
 * `false`.
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = $<$<NaturalNumber.IsGreaterThanOrEqual, 3>, 2>; // false
 * ```
 */
export interface IsGreaterThanOrEqual extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): IsGreaterThanOrEqual_T<typeof x>
}
