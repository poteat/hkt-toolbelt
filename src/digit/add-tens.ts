import { Type, Digit, Kind } from '..';

/**
 * `_addTens_LUT` is a type level lookup table for adding tens of two digits.
 * It should not be used directly by end-users, as it may change in the future.
 */
type _$addTens_LUT = [
  ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
  ['0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
  ['0', '0', '0', '0', '0', '0', '0', '0', '1', '1'],
  ['0', '0', '0', '0', '0', '0', '0', '1', '1', '1'],
  ['0', '0', '0', '0', '0', '0', '1', '1', '1', '1'],
  ['0', '0', '0', '0', '0', '1', '1', '1', '1', '1'],
  ['0', '0', '0', '0', '1', '1', '1', '1', '1', '1'],
  ['0', '0', '0', '1', '1', '1', '1', '1', '1', '1'],
  ['0', '0', '1', '1', '1', '1', '1', '1', '1', '1'],
  ['0', '1', '1', '1', '1', '1', '1', '1', '1', '1']
];

/**
 * `_$addTens` is a type-level function that takes two separate decimal digit
 * types, `A` and `B` as input, and returns the tens digit of the addition between
 * the two specified digits.
 * Details can be found in the corresponding lookup-table `_$addTens_LUT`.
 *
 * @param A A one-character decimal digit type.
 * @param B A one-character decimal digit type.
 *
 * @example
 * For example, forwarding two decimal digits `5` and `6` will result in `1`
 * as the added tens digit.
 *
 * ```ts
 * import { Digit } from "hkt-toolbelt";
 *
 * type Result = Digit._$addTens<"5", "6">; // "1"
 * ```
 */
export type _$addTens<
  A extends Digit.Digit,
  B extends Digit.Digit
> = _$addTens_LUT[A][B];

interface AddTens_T<A extends Digit.Digit> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): _$addTens<A, typeof x>;
}

/**
 * `AddTens` is a type-level function that takes two decimal digit types,
 * `A` and `B`, adds them together, and returns the resultant tens digit.
 *
 * ## Parameters
 * @param A A one-character decimal digit type.
 * @param B A one-character decimal digit type.
 *
 * @example
 * For example, using the `hkt-toolbelt` `$` type-level applicator,
 * we apply `AddTens` to the digits `5` and `7`:
 *
 * ```ts
 * import { Kind, $, Digit } from "hkt-toolbelt";
 *
 * type Result = $<$<Digit.AddTens, "5">, "7">; // "1"
 * ```
 */
export interface AddTens extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): AddTens_T<typeof x>;
}
