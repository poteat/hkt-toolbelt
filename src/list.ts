export * from './list/'

/**
 * The `List` module contains various utilities for working with type-level
 * tuples. It provides utilities such as mapping, filtering, and reducing
 * operations.
 *
 * @example
 * ```ts
 * import { $, List, String } from 'hkt-toolbelt'
 *
 * type Result = $<List.Map, [String.ToUpper, ['foo', 'bar']]> // ['FOO', 'BAR']
 * ```
 */
declare module './list' {}
