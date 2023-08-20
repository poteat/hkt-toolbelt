import { Function } from '..'

/**
 * A unique symbol used internally within the `Kind` class.
 * This serves as a unique identifier for type-level operations and ensures that there are no naming collisions.
 */
export declare const _: unique symbol

/**
 * Represents the type of the unique symbol `_`.
 */
export type _ = typeof _

/**
 * Represents the abstract structure of a kind in the type-level programming toolkit.
 * Kinds are foundational constructs in the toolkit, allowing the modeling and manipulation of type-level functions.
 *
 * @template F - The type-level function associated with the kind. Defaults to the base `Function.Function`.
 *
 * - [_] An internal unique identifier for the kind.
 * - f The type-level function associated with the kind.
 *
 * @example
 * // Define a new kind that retrieves the first element from an array type:
 * export interface First extends Kind.Kind {
 *   f(
 *     x: Type._$cast<this[Kind._], unknown[]>
 *   ): typeof x extends [] ? never : (typeof x)[0]
 * }
 * // Using this kind, you can infer the type of the first element from an array type.
 * type FirstElemen = $<First, [1, 2, 3]> // 1
 */
export declare abstract class Kind<
  F extends Function.Function = Function.Function
> {
  abstract readonly [_]: unknown
  f: F
}
