export * from './type/'

/**
 * The `Type` module contains various utilities for working with
 * types, including casting, displaying, and inferring types.
 *
 * @example
 * ```ts
 * import { $, Type } from 'hkt-toolbelt'
 *
 * type Result = Type._$cast<42, number> // 42
 * ```
 */
declare module './type' {}
