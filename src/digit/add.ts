import { Type, Digit, Kind } from "..";

type _$add_LUT = [
  ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["2", "3", "4", "5", "6", "7", "8", "9", "0", "1"],
  ["3", "4", "5", "6", "7", "8", "9", "0", "1", "2"],
  ["4", "5", "6", "7", "8", "9", "0", "1", "2", "3"],
  ["5", "6", "7", "8", "9", "0", "1", "2", "3", "4"],
  ["6", "7", "8", "9", "0", "1", "2", "3", "4", "5"],
  ["7", "8", "9", "0", "1", "2", "3", "4", "5", "6"],
  ["8", "9", "0", "1", "2", "3", "4", "5", "6", "7"],
  ["9", "0", "1", "2", "3", "4", "5", "6", "7", "8"]
];

/**
 * `_$add` is a type-level function that takes two decimal digit types, `A` and 
 * `B`, and returns the digit that results from their addition. The operation 
 * does not include any carry-over from the addition (see `_$addTens` for tens 
 * place operation).
 *
 * ## Parameters
 *
 * @param A A one-character decimal digit type.
 * @param B A one-character decimal digit type.
 *
 * @example
 *
 * For example, forwarding two decimal digits `7` and `4` will result in `1`
 * as the result of adding those digits.
 *
 * ```ts
 * import { Digit } from "hkt-toolbelt";
 *
 * type Result = Digit._$add<"7", "4">; // "1"
 * ```
 */
export type _$add<
  A extends Digit.Digit,
  B extends Digit.Digit
> = _$add_LUT[A][B];

interface Add_T<A extends Digit.Digit> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): _$add<A, typeof x>;
}

/**
 * `Add` is a type-level function that takes two decimal digit types,
 * `A` and `B`, adds them together (excluding the carry-over), and returns
 * the resulting digit type.
 *
 * ## Parameters
 * @param A A one-character decimal digit type.
 * @param B A one-character decimal digit type.
 *
 * @example
 *
 * For example, using the `hkt-toolbelt` `$` type-level applicator,
 * we apply `Add` to the digits `7` and `4`:
 *
 * ```ts
 * import { Kind, $, Digit } from "hkt-toolbelt";
 *
 * type Result = $<$<Digit.Add, "7">, "4">; // "1"
 * ```
 */
export interface Add extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): Add_T<typeof x>;
}
