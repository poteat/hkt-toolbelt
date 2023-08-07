/**
 * `Zero` is a type representing the digit zero ("0"). It is a subtype of the
 * `Digit` type, and can be used in various arithmetic operations and
 * comparisons provided by the `DigitList` and `NaturalNumber` namespaces.
 *
 * @example
 * For example, we can use `Zero` in arithmetic operations like addition:
 *
 * ```ts
 * import { $, DigitList, Digit } from "hkt-toolbelt";
 *
 * type Result = $<$<DigitList.Add, [Digit.Zero]>, ["1"]>; // ["1"]
 * ```
 *
 * In this example, we add `Zero` to the digit "1", and the result is a digit
 * list containing the digit "1".
 */
export type Zero = '0'
