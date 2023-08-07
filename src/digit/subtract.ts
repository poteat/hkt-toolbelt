import { Type, Digit, Kind } from "..";

type _$subtract_LUT = [
  ["0", "9", "8", "7", "6", "5", "4", "3", "2", "1"],
  ["1", "0", "9", "8", "7", "6", "5", "4", "3", "2"],
  ["2", "1", "0", "9", "8", "7", "6", "5", "4", "3"],
  ["3", "2", "1", "0", "9", "8", "7", "6", "5", "4"],
  ["4", "3", "2", "1", "0", "9", "8", "7", "6", "5"],
  ["5", "4", "3", "2", "1", "0", "9", "8", "7", "6"],
  ["6", "5", "4", "3", "2", "1", "0", "9", "8", "7"],
  ["7", "6", "5", "4", "3", "2", "1", "0", "9", "8"],
  ["8", "7", "6", "5", "4", "3", "2", "1", "0", "9"],
  ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0"]
];

/**
 * `_$subtract` is a type-level function that takes in two digit types, `A` and
 * `B`, and returns the digit result of subtracting `B` from `A`. The subtraction
 * is performed using a lookup table (`_$subtract_LUT`), which contains the
 * results of all possible digit subtractions.
 *
 * @param A A digit type.
 * @param B A digit type.
 *
 * @example
 * For example, we can use `_$subtract` to subtract two digit types. In this
 * example, "2" and "1" are passed as type arguments to the type-level function:
 *
 * ```ts
 * import { Digit } from "hkt-toolbelt";
 *
 * type Result = Digit._$subtract<"2", "1">; // "1"
 * ```
 */
export type _$subtract<
  A extends Digit.Digit,
  B extends Digit.Digit
> = _$subtract_LUT[A][B];

interface Subtract_T<A extends Digit.Digit> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): _$subtract<A, typeof x>;
}

/**
 * `Subtract` is a type-level function that takes in two digit types, `A` and
 * `B`, and returns the digit result of subtracting `B` from `A`.
 *
 * @param A A digit type.
 * @param B A digit type.
 *
 * @example
 * For example, we can use `Subtract` to subtract two digit types. In this
 * example, "2" and "1" are passed as type arguments to the type-level function:
 *
 * We apply `Subtract` to "2" and "1" respectively using the `$` type-level
 * applicator:
 *
 * ```ts
 * import { $, Digit } from "hkt-toolbelt";
 *
 * type Result = $<$<Digit.Subtract, "2">, "1">; // "1"
 * ```
 */
export interface Subtract extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): Subtract_T<typeof x>;
}
