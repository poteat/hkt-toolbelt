import { Digit } from "..";

/**
 * `DigitList` is a type alias representing a list of decimal digits from "0" to "9" (inclusive).
 *
 * @example
 * For example, we can use `DigitList` to represent a list of decimal digits from "0" to "9":
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type MyDigitList = DigitList; // ("0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9")[]
 * ```
 *
 */
export type DigitList = readonly Digit.Digit[];
