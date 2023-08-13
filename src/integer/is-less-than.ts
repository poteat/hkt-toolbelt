import { Number, Integer, Kind, Type } from '..'

/**
 * `_$isLessThan` is a type-level function that takes in two integer
 * types, `A` and `B`, and returns a boolean indicating whether `B` is less
 * than `A`.
 *
 * @param A The number to compare against.
 * @param B The number to compare.
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
  RESULT extends boolean = Integer._$compare<B, A> extends -1 ? true : false
> = RESULT

interface IsLessThan_T<A extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$isLessThan<A, typeof x>
}

/**
 * `IsLessThan` is a type-level function that takes in two integer
 * types, `A` and `B`, and returns a boolean indicating whether `B` is less
 * than `A`.
 *
 * @param A The number to compare against.
 * @param B The number to evaluate.
 *
 * The parameters are ordered such that `IsLessThan` can be partially applied
 * in a coherent manner. That is, we can apply `IsLessThan` to `3`, and have a
 * function `IsLessThanThree`.
 *
 * @example
 * For example, we can use `IsLessThan` to determine whether an integer is
 * less than another integer. In this example, `-4` and `-3` are passed as
 * type arguments to the type-level function:
 *
 * We apply `IsLessThan` to `-3`, and then to `-4` respectively using the `$`
 * type-level applicator:
 *
 * ```ts
 * import { $, Integer } from "hkt-toolbelt";
 *
 * type Result = $<$<Integer.IsLessThan, -3>, -4>; // true
 * ```
 *
 * @example
 * If we apply `IsLessThan` to `-3` and `-3`, we should expect to get `false`.
 *
 * ```ts
 * import { $, Integer } from "hkt-toolbelt";
 *
 * type Result = $<$<Integer.IsLessThan, -3>, -3>; // false
 * ```
 *
 * @example
 * If we apply `IsLessThan` to `-3` and `4`, we should expect to get `false`.
 *
 * ```ts
 * import { $, Integer } from "hkt-toolbelt";
 *
 * type Result = $<$<Integer.IsLessThan, -3>, 4>; // false
 * ```
 */
export interface IsLessThan extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): IsLessThan_T<typeof x>
}
