export * from './$/'

/**
 * The `$` module contains various type-level utilities for applying type-level
 * functions to arguments.
 *
 * @example
 * ```ts
 * import { $, List, String } from 'hkt-toolbelt'
 *
 * type Result = $<List.Map<String.ToUpper>, ['foo', 'bar']> // ['FOO', 'BAR']
 * ```
 */
declare module './$' {}
