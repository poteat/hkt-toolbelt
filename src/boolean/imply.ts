import { Kind, Type } from "..";

/**
 * `_$imply` is a type-level function that takes in two boolean types, `T` and
 * `U`, and returns the boolean result of applying the 'imply' logical
 * operation on `T` and `U`. If `T` is true and `U` is false, then `_$imply`
 * returns false, otherwise it returns true.
 *
 * This is also known as the 'logical implication' operator.
 *
 * ## Parameters
 *
 * @param T A boolean type.
 * @param U A boolean type.
 *
 * ## Example
 *
 * @example
 * For example, we can use `_$imply` to determine whether a statement is true
 * given the truth values of two propositions, `T` and `U`. In this example,
 * `true` and `false` are passed as type arguments to the type-level function:
 *
 * ```ts
 * import { Boolean } from "hkt-toolbelt";
 *
 * type Result = Boolean._$imply<true, false>; // false
 * ```
 */
export type _$imply<T extends boolean, U extends boolean> = [T, U] extends [
  true,
  false
]
  ? false
  : true;

interface Imply_T<T extends boolean> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): _$imply<T, typeof x>;
}

/**
 * `Imply` is a type-level function that takes in two boolean types, `T` and
 * `U`, and returns the boolean result of applying the 'imply' logical
 * operation on `T` and `U`.
 *
 * This is also known as the 'logical implication' operator.
 *
 * @param T A boolean type.
 * @param U A boolean type.
 *
 * @example
 * For example, we can use `Imply` to determine whether a statement is true
 * given the truth values of two propositions, `T` and `U`. In this example,
 * `true` and `false` are passed as type arguments to the type-level function:
 *
 * We apply `Imply` to `true` and `false` respectively using the `$` type-level
 * applicator:
 *
 * ```ts
 * import { $, Boolean } from "hkt-toolbelt";
 *
 * type Result = $<$<Boolean.Imply, true>, false>; // false
 * ```
 */
export interface Imply extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): Imply_T<typeof x>;
}
