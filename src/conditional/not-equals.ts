import { Kind } from "..";

/**
 * `_$notEquals` is a type-level function that returns `true` if `T` and `U` are
 * not equal. Otherwise, it returns `false`.
 *
 * @param T The first type to compare.
 * @param U The second type to compare.
 *
 * @example
 * In this example, `true` and `false` are passed as type arguments to the
 * type-level function:
 *
 * ```ts
 * import { Conditional } from "hkt-toolbelt";
 *
 * type Result = Conditional._$notEquals<true, false>; // true
 * ```
 */
export type _$notEquals<T, U> = [T, U] extends [U, T] ? false : true;

interface NotEquals_T<T> extends Kind.Kind {
  f(x: this[Kind._]): _$notEquals<T, typeof x>
}

/**
 * `NotEquals` is a type-level function that returns `true` if `T` and `U` are
 * not equal. Otherwise, it returns `false`.
 *
 * @param T The first type to compare.
 * @param U The second type to compare.
 *
 * @example
 * ```ts
 * import { $, Conditional } from 'hkt-toolbelt'
 *
 * type Result = $<Conditional.NotEquals, "foo", "bar"> // true
 * ```
 */
export interface NotEquals extends Kind.Kind {
  f(x: this[Kind._]): NotEquals_T<typeof x>
}
