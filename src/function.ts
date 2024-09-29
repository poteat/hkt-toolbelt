export * from './function/'

/**
 * The `Function` module contains various utilities for working with function
 * types. Function types are used in various contexts, such as representing
 * higher-order functions.
 *
 * @example
 * ```ts
 * import { $, Function } from 'hkt-toolbelt'
 *
 * type Result = $<$<Function.ReturnType, (x: number) => string>, 42> // string
 * ```
 */
declare module './function' {}
