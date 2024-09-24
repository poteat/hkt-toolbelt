export * from './$/'

/**
 * The `$` module contains various type-level utilities for applying type-level
 * functions to arguments.
 *
 * @example
 * ```ts
 * import { $, String } from 'hkt-toolbelt'
 *
 * type Result = $<String.ToUpper, 'foo'> // 'FOO'
 * ```
 */
declare module './$' {}
