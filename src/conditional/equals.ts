import { Kind } from '..';

/**
 * `_$equals` is a type-level function that takes in two types, `T` and `U`, and
 * returns `true` if `T` and `U` are the same type, and `false` otherwise.
 *
 * @param T A type.
 * @param U A type.
 *
 * @example
 * For example, we can use `_$equals` to determine whether two types are equal.
 * In this example, `true` and `true` are passed as type arguments to the
 * type-level function:
 *
 * ```ts
 * import { Conditional } from "hkt-toolbelt";
 *
 * type Result = Conditional._$equals<true, true>; // true
 * ```
 *
 * @example
 * In this example, `true` and `false` are passed as type arguments to the
 * type-level function:
 *
 * ```ts
 * import { Conditional } from "hkt-toolbelt";
 *
 * type Result = Conditional._$equals<true, false>; // false
 * ```
 */
export type _$equals<T, U> = [T, U] extends [U, T] ? true : false;

interface Equals_T<T> extends Kind.Kind {
  f(x: this[Kind._]): _$equals<T, typeof x>;
}

/**
 * `Equals` is a type-level function that takes in one type, `T`, and returns a
 * type-level function that takes in one type, `U`, and returns `true` if `U` is
 * the same type as `T`, and `false` otherwise.
 *
 * @param T A type.
 * @param U A type.
 *
 * @example
 * For example, we can use `Equals` to determine whether two types are equal.
 * In this example, we partially apply `Equals` to `true`, which results in a
 * type-level function that returns `true` if its input is the same as `true`.
 *
 * We then apply this partially applied function to `true` and `false`
 * respectively using the `$` type-level applicator:
 *
 * ```ts
 * import { $, Conditional } from "hkt-toolbelt";
 *
 * type IsTrue = $<$<Conditional.Equals, true>, true>; // true
 * type IsNotTrue = $<$<Conditional.Equals, true>, false>; // false
 * ```
 */
export interface Equals extends Kind.Kind {
  f(x: this[Kind._]): Equals_T<typeof x>;
}
