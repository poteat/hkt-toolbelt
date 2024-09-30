import { Kind } from '..'

interface Constant_T<X> extends Kind.Kind {
  f(x: this[Kind._]): X
}

/**
 * `Constant` is a type-level function that constructs a type-level function
 * which always returns the given value, regardless of input.
 *
 * @template T - The constant value to return.
 *
 * @returns The configured constant value T.
 *
 * @example
 *
 * ```ts
 * import { $, Function } from 'hkt-toolbelt'
 *
 * // Returns 'foo' regardless of input
 * type C = $<$<Function.Constant, 'foo'>, 0> // 'foo'
 * type D = $<$<Function.Constant, 'foo'>, 'bar'> // 'foo'
 * ```
 */
export interface Constant extends Kind.Kind {
  f(x: this[Kind._]): Constant_T<typeof x>
}

/**
 * Given a value, form a constant function that always returns that value.
 *
 * @param {unknown} x - The value to return.
 *
 * @example
 * ```ts
 * import { Function } from "hkt-toolbelt";
 *
 * const result = Function.constant('foo')('ignored')
 * //    ^? foo
 * ```
 */
export const constant = ((x: unknown) => (_y?: never) =>
  x) as Kind._$reify<Constant>
