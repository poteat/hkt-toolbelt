import { Number, NaturalNumber, Kind, Type } from '..'

/**
 * `_$isGreaterThan` is a type-level function that takes in two natural number
 * types, `A` and `B`, and returns a boolean indicating whether `B` is greater
 * than `A`.
 *
 * This function works by comparing the ordinal values of `A` and `B`. If `B`
 * has a lower ordinal value than `A`, then `B` is greater than `A`.
 *
 * @param A The number to compare against.
 * @param B The number to compare.
 */
export type _$isGreaterThan<
  /**
   * The number to compare against.
   */
  A extends Number.Number,
  /**
   * The number to evaluate.
   */
  B extends Number.Number,
  /**
   * `true` iff `B` is greater than `A`.
   */
  RESULT extends boolean = NaturalNumber._$compare<B, A> extends 1
    ? true
    : false
> = RESULT

interface IsGreaterThan_T<A extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$isGreaterThan<A, typeof x>
}

/**
 * `IsGreaterThan` is a type-level function that takes in two natural number
 * types, `A` and `B`, and returns a boolean indicating whether `B` is greater
 * than `A`.
 *
 * @param A The number to compare against.
 * @param B The number to evaluate.
 *
 * The parameters are ordered such that `IsGreaterThan` can be partially applied
 * in a coherent manner. That is, we can apply `IsGreaterThan` to `3`, and have a
 * function `IsGreaterThanThree`.
 *
 * @example
 * For example, we can use `IsGreaterThan` to determine whether a natural number is
 * greater than another natural number. In this example, `3` and `4` are passed as
 * type arguments to the type-level function:
 *
 * We apply `IsGreaterThan` to `3`, and then to `4` respectively using the `$`
 * type-level applicator:
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = $<$<NaturalNumber.IsGreaterThan, 3>, 4>; // true
 * ```
 *
 * @example
 * If we apply `IsGreaterThan` to `3` and `3`, we should expect to get `false`.
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = $<$<NaturalNumber.IsGreaterThan, 3>, 3>; // false
 * ```
 *
 * @example
 * If we apply `IsGreaterThan` to `3` and `2`, we should also expect to get
 * `false`.
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = $<$<NaturalNumber.IsGreaterThan, 3>, 2>; // false
 * ```
 */
export interface IsGreaterThan extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): IsGreaterThan_T<typeof x>
}
