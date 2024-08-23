export * from './kind/'

/**
 * The `Kind` module contains various utilities for working with higher-kinded
 * types. Higher-kinded types are used in various contexts, such as representing
 * and manipulating higher-order functions, and composing types.
 *
 * @example
 * ```ts
 * import { $, Kind } from 'hkt-toolbelt'
 *
 * type Result = $<$<Kind.Apply, [1, 2, 3]>, Function.Identity> // [1, 2, 3]
 * ```
 */
declare module './kind' {}
