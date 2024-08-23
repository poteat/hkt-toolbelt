export * from './natural-number/'

/**
 * The `NaturalNumber` module contains various utilities for working with
 * natural numbers, i.e. integers above or equal to zero. It provides utilities
 * such as addition, comparison, etc.
 *
 * @example
 * ```ts
 * import { $, NaturalNumber } from 'hkt-toolbelt'
 *
 * type Result = $<NaturalNumber.Increment, 5> // 6
 * ```
 */
declare module './natural-number' {}
