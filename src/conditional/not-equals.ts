import { Kind } from '..'
import { deepEqual } from '../_internal/deepEqual'

/**
 * `_$notEquals` is a type-level function that returns `true` if `T` and `U` are
 * not equal. Otherwise, it returns `false`.
 *
 * @template {any} T - The first type to compare.
 * @template {any} U - The second type to compare.
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
export type _$notEquals<T, U> = [T, U] extends [U, T] ? false : true

interface NotEquals_T<T> extends Kind.Kind {
  f(x: this[Kind._]): _$notEquals<T, typeof x>
}

/**
 * `NotEquals` is a type-level function that returns `true` if `T` and `U` are
 * not equal. Otherwise, it returns `false`.
 *
 * @template {any} T - The first type to compare.
 * @template {any} U - The second type to compare.
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

/**
 * Given two values, return whether they are not equal.
 *
 * @param {unknown} a - The first value.
 * @param {unknown} b - The second value.
 *
 * @example
 * ```ts
 * import { Conditional } from "hkt-toolbelt";
 *
 * const result = Conditional.notEquals('foo')('bar')
 * //    ^? true
 * ```
 */
export const notEquals = ((a: unknown) => (b: unknown) =>
  !deepEqual(a, b)) as Kind._$reify<NotEquals>
