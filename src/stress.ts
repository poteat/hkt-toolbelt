export * from './stress/'

/**
 * The `Stress` module contains various utilities for stress testing
 * type-level functions, including generating large tuples and objects. This is
 * used internally to ensure that type-level functions are robust and can handle
 * large inputs without crashing.
 *
 * @example
 * ```ts
 * import { $, Stress, List } from 'hkt-toolbelt'
 *
 * type Result = $<List.Length, Stress.HundredTuple> // 100
 * ```
 */
declare module './stress' {}
