export * from './digit-list/'

/**
 * The `DigitList` module contains various utilities for working with digit
 * lists. Digit lists are a type-level representation of lists of decimal digits
 * (0-9). They are used in various contexts, such as representing numbers.
 *
 * @example
 * ```ts
 * import { $, DigitList } from 'hkt-toolbelt'
 *
 * type Result = $<$<DigitList.Add, ["1", "2", "3"]>, ["4", "5", "6"]> // ["5", "7", "9"]
 * ```
 */
declare module './digit-list' {}
