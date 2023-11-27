import { Number, Kind, Type } from '..'

/**
 * `_$isLessThan` is a type-level function that takes in two number
 * types, `A` and `B`, and returns a boolean indicating whether `B` is less
 * than `A`.
 *
 * @template {Number.Number} A - A number to compare against.
 * @template {Number.Number} B - A number to compare.
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
  RESULT extends boolean = Number._$compare<B, A> extends -1 ? true : false
> = RESULT

interface IsLessThan_T<A extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$isLessThan<A, typeof x>
}

/**
 * `IsLessThan` is a type-level function that takes in two number
 * types, `A` and `B`, and returns a boolean indicating whether `B` is less
 * than `A`.
 *
 * @template {Number.Number} A - A number to compare against.
 * @template {Number.Number} B - A number to compare.
 * @returns {boolean}
 *
 * The parameters are ordered such that `IsLessThan` can be partially applied
 * in a coherent manner. That is, we can apply `IsLessThan` to `3`, and have a
 * function `IsLessThanThree`.
 *
 * @example
 * For example, we can use `IsLessThan` to determine whether an number is
 * less than another number. In this example, `-3.1` and `-3` are passed as
 * type arguments to the type-level function:
 *
 * We apply `IsLessThan` to `-3`, and then to `-3.1` respectively using the `$`
 * type-level applicator:
 *
 * ```ts
 * import { $, Number } from "hkt-toolbelt";
 *
 * type Result = $<$<Number.IsLessThan, -3>, -3.1>; // true
 * ```
 *
 * @example
 * If we apply `IsLessThan` to `-3` and `-3`, we should expect to get `false`.
 *
 * ```ts
 * import { $, Number } from "hkt-toolbelt";
 *
 * type Result = $<$<Number.IsLessThan, -3>, -3>; // false
 * ```
 *
 * @example
 * If we apply `IsLessThan` to `-3` and `3.1`, we should expect to get `false`.
 *
 * ```ts
 * import { $, Number } from "hkt-toolbelt";
 *
 * type Result = $<$<Number.IsLessThan, -3>, 3.1>; // false
 * ```
 */
export interface IsLessThan extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): IsLessThan_T<typeof x>
}
