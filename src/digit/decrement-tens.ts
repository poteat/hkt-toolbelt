import { Type, Digit, Kind } from '..'

type _$decrementTens_LUT = ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0']

/**
 * `_$decrementTens` is a type-level function that takes a single decimal digit
 * type `A`, and determines whether the tens digit should be decremented in
 * a subtraction operation. If decrementing the provided digit would require
 * a carry-over from the tens digit (i.e., when `A` is "0"), the function returns "1".
 * In all other cases, the function returns "0".
 *
 * This function is intended to be used as part of a larger subtraction operation.
 * It only operates on individual digits and does not handle the logic
 * for the full subtraction or decrementing of the tens digit.
 *
 * @param A A one-character decimal digit type.
 *
 * @example
 * For example, forwarding a decimal digit `9` will result in:
 *
 * ```ts
 * import { Digit } from "hkt-toolbelt";
 *
 * type Result = Digit._$decrementTens<"9">; // "0"
 * ```
 */
export type _$decrementTens<A extends Digit.Digit> = _$decrementTens_LUT[A]

/**
 * `DecrementTens` is a type-level function that takes a single decimal digit
 * type `A` and determines whether the tens digit should be decremented
 * during a subtraction operation.
 *
 * ## Parameters
 * @param A A one-character decimal digit type.
 *
 * @example
 * For example, using the `hkt-toolbelt` `$` type-level applicator,
 * we apply `DecrementTens` to the digit `4`:
 *
 * ```ts
 * import { $, Digit } from "hkt-toolbelt";
 *
 * type Result = $<Digit.DecrementTens, "4">; // "0"
 * ```
 */
export interface DecrementTens extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): _$decrementTens<typeof x>
}
