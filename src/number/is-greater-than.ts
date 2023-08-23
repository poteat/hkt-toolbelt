import { Number, Kind, Type } from '..'

/**
 * `_$isGreaterThan` is a type-level function that takes in two number
 * types, `A` and `B`, and returns a boolean indicating whether `B` is greater
 * than `A`.
 *
 * @template {Number.Number} A - A number to compare against.
 * @template {Number.Number} B - A number to compare.
 * @returns {boolean}
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
  RESULT extends boolean = Number._$compare<B, A> extends 1 ? true : false
> = RESULT

interface IsGreaterThan_T<A extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$isGreaterThan<A, typeof x>
}

/**
 * `IsGreaterThan` is a type-level function that takes in two number
 * types, `A` and `B`, and returns a boolean indicating whether `B` is greater
 * than `A`.
 *
 * @template {Number.Number} A - A number to compare against.
 * @template {Number.Number} B - A number to evaluate.
 * @returns {boolean}
 *
 * The parameters are ordered such that `IsGreaterThan` can be partially applied
 * in a coherent manner. That is, we can apply `IsGreaterThan` to `3`, and have a
 * function `IsGreaterThanThree`.
 *
 * @example
 * For example, we can use `IsGreaterThan` to determine whether an number is
 * greater than another number. In this example, `-2.9` and `-3` are passed as
 * type arguments to the type-level function:
 *
 * We apply `IsGreaterThan` to `-3`, and then to `-2.9` respectively using the `$`
 * type-level applicator:
 *
 * ```ts
 * import { $, Number } from "hkt-toolbelt";
 *
 * type Result = $<$<Number.IsGreaterThan, -3>, -2.9>; // true
 * ```
 *
 * @example
 * If we apply `IsGreaterThan` to `-3` and `-3`, we should expect to get `false`.
 *
 * ```ts
 * import { $, Number } from "hkt-toolbelt";
 *
 * type Result = $<$<Number.IsGreaterThan, -3>, -3>; // false
 * ```
 *
 * @example
 * If we apply `IsGreaterThan` to `-3` and `-3.1`, we should expect to get `false`.
 *
 * ```ts
 * import { $, Number } from "hkt-toolbelt";
 *
 * type Result = $<$<Number.IsGreaterThan, -3>, -3.1>; // false
 * ```
 */
export interface IsGreaterThan extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): IsGreaterThan_T<typeof x>
}
