export * from './digit/'

/**
 * The `Digit` module contains various utilities for working with decimal digits
 * (0-9). Digits are used in various contexts, such as representing numbers.
 *
 * @example
 * ```ts
 * import { $, Digit } from 'hkt-toolbelt'
 *
 * type Result = $<$<Digit.Add, 1>, 2> // 3
 * ```
 */
declare module './digit' {}
