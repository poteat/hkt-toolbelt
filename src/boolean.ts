export * from './boolean/'

/**
 * The `Boolean` module contains various boolean type utilities. These utilities
 * are used to perform logical operations on boolean types.
 *
 * @example
 * ```ts
 * import { $, Boolean } from 'hkt-toolbelt'
 *
 * type Result = $<Boolean.And<true>, false> // false
 * ```
 */
declare module './boolean' {}
