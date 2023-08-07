import { Type, Digit, Kind } from '..';

type _$increment_LUT = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

/**
 * `_$increment` is a type-level function that takes in a digit type `A` and
 * returns the next digit in the sequence. If the input digit is "9", the
 * function returns "0".
 *
 * @param A A digit type.
 *
 * @example
 * For example, we can use `_$increment` to increment a digit type:
 *
 * ```ts
 * import { Digit } from "hkt-toolbelt";
 *
 * type Result = Digit._$increment<"3">; // "4"
 * ```
 */
export type _$increment<A extends Digit.Digit> = _$increment_LUT[A];

/**
 * `Increment` is a type-level function that takes in a digit type `A` and
 * returns the next digit in the sequence. If the input digit is "9", the
 * function returns "0".
 *
 * @param A A digit type.
 *
 * @example
 * For example, we can use `Increment` to increment a digit type:
 *
 * We apply `Increment` to a digit type using the `$` type-level applicator:
 *
 * ```ts
 * import { $, Digit } from "hkt-toolbelt";
 *
 * type Result = $<Digit.Increment, "3">; // "4"
 * ```
 */
export interface Increment extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): _$increment<typeof x>;
}
