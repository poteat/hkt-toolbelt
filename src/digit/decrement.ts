import { Type, Digit, Kind } from '..';

type _$decrement_LUT = ['9', '0', '1', '2', '3', '4', '5', '6', '7', '8'];

/**
 * `_$decrement` is a type-level function which takes in a required `Digit.Digit`
 * type parameter and returns a subsequent digit. The new digit is immediately
 * before the input digit in the sequence "0, 1, 2, 3, 4, 5, 6, 7, 8, 9".
 *
 * ## Parameter
 *
 * @param A A single-digit type which represents a digit from "0" to "9".
 *
 * @example
 * For example, if we want to subtract one from the digit "5", we would use
 * this type-level function as follows:
 *
 * ```ts
 * import { Digit } from 'hkt-toolbelt';
 *
 * type Result = Digit._$decrement<'5'>; // "4"
 * ```
 */
export type _$decrement<A extends Digit.Digit> = _$decrement_LUT[A];

/**
 * `Decrement` is a type-level function which takes in a required `Digit.Digit`,
 * and returns the preceding digit. The preceding digit is the digit immediately
 * before the provided digit in the sequence "0, 1, 2, 3, 4, 5, 6, 7, 8, 9".
 *
 * We apply `Decrement` to a digit using the `$` type-level applicator.
 *
 * @param A A single-digit type which represents a digit from "0" to "9".
 *
 * @example
 * For example, if we want to subtract one from the digit "5", we would use
 * this type-level function as follows:
 *
 * ```ts
 * import { $, Digit } from 'hkt-toolbelt';
 *
 * type Result = $<Digit.Decrement, '5'>; // "4"
 * ```
 */
export interface Decrement extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): _$decrement<typeof x>;
}
