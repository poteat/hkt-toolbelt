export * from './object/'

/**
 * The `Object` module contains various utilities for working with
 * objects, including getting and setting values, merging, etc.
 *
 * @example
 * ```ts
 * import { $, Object } from 'hkt-toolbelt'
 *
 * type Result = $<Object.AtPath, ['name', 'first'], { name: { first: 'foo' } }> // 'foo'
 * ```
 */
declare module './object' {}
