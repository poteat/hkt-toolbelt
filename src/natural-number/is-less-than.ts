import { Number, NaturalNumber, Kind, Type } from '..'

/**
 * `_$isLessThan` is a type-level function that takes in two natural number
 * types, `A` and `B`, and returns a boolean indicating whether `B` is less
 * than `A`.
 *
 * This function works by comparing the ordinal values of `A` and `B`. If `B`
 * has a lower ordinal value than `A`, then `B` is less than `A`.
 *
 * @template {Number.Numer} A - A natural number to compare against.
 * @template {Number.Numer} B - A natural number to compare.
 * @returns {boolean}
 */
export type _$isLessThan<
  /**
   * The number to compare against.
   */
  A extends Number.Number,
  /**
   * The number to evaluate.
   */
  B extends Number.Number,
  /**
   * `true` iff `B` is less than `A`.
   */
  RESULT extends boolean = NaturalNumber._$compare<B, A> extends -1
    ? true
    : false
> = RESULT

interface IsLessThan_T<A extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$isLessThan<A, typeof x>
}

/**
 * `IsLessThan` is a type-level function that takes in two natural number
 * types, `A` and `B`, and returns a boolean indicating whether `B` is less
 * than `A`.
 *
 * @template {Number.Number} A - A natural number to compare against.
 * @template {Number.Number} B - A natural number to compare.
 * @returns {boolean}
 *
 * The parameters are ordered such that `IsLessThan` can be partially applied
 * in a coherent manner. That is, we can apply `IsLessThan` to `3`, and have a
 * function `IsLessThanThree`.
 *
 * @example
 * For example, we can use `IsLessThan` to determine whether a natural number is
 * less than another natural number. In this example, `3` and `2` are passed as
 * type arguments to the type-level function:
 *
 * We apply `IsLessThan` to `3`, and then to `2` respectively using the `$`
 * type-level applicator:
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = $<$<NaturalNumber.IsLessThan, 3>, 2>; // true
 * ```
 *
 * @example
 * If we apply `IsLessThan` to `3` and `3`, we should expect to get `false`.
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = $<$<NaturalNumber.IsLessThan, 3>, 3>; // false
 * ```
 *
 * @example
 * If we apply `IsLessThan` to `3` and `4`, we should also expect to get
 * `false`.
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = $<$<NaturalNumber.IsLessThan, 3>, 4>; // false
 * ```
 */
export interface IsLessThan extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): IsLessThan_T<typeof x>
}
