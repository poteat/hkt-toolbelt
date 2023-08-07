/**
 * `Digit` is a type alias that represents a single decimal digit in the range
 * from "0" to "9" (inclusive). Each decimal digit is represented as a string
 * literal type. This type is particularly useful when working with
 * type-level numerical operations or string manipulation involving numbers.
 *
 * @example
 * Here are some usage examples of the `Digit` type:
 *
 * ```ts
 * import { Digit } from 'hkt-toolbelt'
 *
 * type MyDigit = Digit // "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" |
 * "8" | "9"
 * ```
 *
 * @example
 * You can also use the `Digit` type in combination with other `hkt-toolbelt`
 * utilities such as numerical operations or string manipulation.
 *
 * ```ts
 * import { Digit, String } from 'hkt-toolbelt'
 *
 * // `Increment` utility increments a decimal digit by 1.
 * type One = $<String.Increment, Digit.Zero> // "1"
 * ```
 */
export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
