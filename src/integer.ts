export * from './integer/'

/**
 * The `Integer` module contains various utilities for working with integer
 * types, i.e. signed and unsigned integers.
 *
 * @example
 * ```ts
 * import { $, Integer } from 'hkt-toolbelt'
 *
 * type Result = $<$<Integer.Add, 1>, -2> // -1
 * ```
 */
declare module './integer' {}
