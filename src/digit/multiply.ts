import { Type, Kind, Digit } from "..";

type _$multiply_LUT = [
  ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  ["0", "2", "4", "6", "8", "0", "2", "4", "6", "8"],
  ["0", "3", "6", "9", "2", "5", "8", "1", "4", "7"],
  ["0", "4", "8", "2", "6", "0", "4", "8", "2", "6"],
  ["0", "5", "0", "5", "0", "5", "0", "5", "0", "5"],
  ["0", "6", "2", "8", "4", "0", "6", "2", "8", "4"],
  ["0", "7", "4", "1", "8", "5", "2", "9", "6", "3"],
  ["0", "8", "6", "4", "2", "0", "8", "6", "4", "2"],
  ["0", "9", "8", "7", "6", "5", "4", "3", "2", "1"]
];

/**
 * `_$multiply` is a type-level function that takes in two digit types, `A` and
 * `B`, and returns the result of multiplying `A` by `B`, modulo 10. The result
 * is a single digit type.
 *
 * ## Parameters
 *
 * @param A A digit type.
 * @param B A digit type.
 *
 * ## Example
 *
 * @example
 *
 * For example, we can use `_$multiply` to multiply two digit types. In this
 * example, `2` and `3` are passed as type arguments to the type-level function:
 *
 * ```ts
 * import { Digit } from "hkt-toolbelt";
 *
 * type Result = Digit._$multiply<"2", "3">; // "6"
 * ```
 */
export type _$multiply<
  A extends Digit.Digit,
  B extends Digit.Digit
> = _$multiply_LUT[A][B];

interface Multiply_T<A extends Digit.Digit> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): _$multiply<A, typeof x>;
}

/**
 * `Multiply` is a type-level function that takes in two digit types, `A` and
 * `B`, and returns the result of multiplying `A` by `B`, modulo 10. The result
 * is a single digit type.
 *
 * @param A A digit type.
 * @param B A digit type.
 *
 * @example
 *
 * For example, we can use `Multiply` to multiply two digit types. In this
 * example, `2` and `3` are passed as type arguments to the type-level function:
 *
 * We apply `Multiply` to `2` and `3` respectively using the `$` type-level
 * applicator:
 *
 * ```ts
 * import { $, Digit } from "hkt-toolbelt";
 *
 * type Result = $<$<Digit.Multiply, "2">, "3">; // "6"
 * ```
 */
export interface Multiply extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): Multiply_T<typeof x>;
}
