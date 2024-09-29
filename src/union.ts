export * from './union/'

/**
 * The `Union` module contains various utilities for working with union types,
 * including converting to intersections, lists, etc.
 *
 * @example
 * ```ts
 * import { $, Union } from 'hkt-toolbelt'
 *
 * type Result = $<Union.Length, { foo: 'bar' } | 'bar' | { bar: 'foo' }> // 3
 * ```
 */
declare module './union' {}
