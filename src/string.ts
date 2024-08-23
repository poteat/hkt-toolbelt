export * from './string/'

/**
 * The `String` module contains various utilities for working with
 * strings, including manipulating string types, joining strings, etc.
 *
 * @example
 * ```ts
 * import { $, String } from 'hkt-toolbelt'
 *
 * type Result = $<$<String.Append, 'bar'>, 'foo'> // 'foobar'
 * ```
 */
declare module './string' {}
