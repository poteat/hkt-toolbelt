export * from './test/'

/**
 * The `Test` module contains various utilities for testing type-level
 * functions, including expecting types to be equal, etc. This is used
 * internally to ensure correctness.
 *
 * @example
 * ```ts
 * import { $, Test } from 'hkt-toolbelt'
 *
 * type Result = Test.Expect<true, false> // compiler error
 * ```
 */
declare module './test' {}
