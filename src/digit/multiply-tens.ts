import { Type, Kind, Digit } from '..'

/**
 * `_$multiplyTens` is a type-level function that takes in two single-digit
 * types, `A` and `B`, and returns the tens place of the product of `A` and `B`.
 * This function works with digit types represented as strings.
 *
 * @template A - A single-digit type.
 * @template B - A single-digit type.
 *
 * @example
 * For example, we can use `_$multiplyTens` to compute the tens place of the
 * product of two single-digit types:
 *
 * ```ts
 * import { Digit } from "hkt-toolbelt"
 *
 * type Result = Digit._$multiplyTens<"5", "4"> // "2"
 * ```
 */
type _$multiplyTens_LUT = [
  ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
  ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
  ['0', '0', '0', '0', '0', '1', '1', '1', '1', '1'],
  ['0', '0', '0', '0', '1', '1', '1', '2', '2', '2'],
  ['0', '0', '0', '1', '1', '2', '2', '2', '3', '3'],
  ['0', '0', '1', '1', '2', '2', '3', '3', '4', '4'],
  ['0', '0', '1', '1', '2', '3', '3', '4', '4', '5'],
  ['0', '0', '1', '2', '2', '3', '4', '4', '5', '6'],
  ['0', '0', '1', '2', '3', '4', '4', '5', '6', '7'],
  ['0', '0', '1', '2', '3', '4', '5', '6', '7', '8']
]

/**
 * `_$multiplyTens` is a type-level function that takes in two single-digit
 * types, `A` and `B`, and returns the tens place of the product of `A` and `B`.
 * This function works with digit types represented as strings.
 *
 * @template A - A single-digit type
 * @template B - A single-digit type
 *
 * @example
 * ```ts
 * import { Digit } from "hkt-toolbelt";
 *
 * type Result = Digit._$multiplyTens<"5", "4">; // "2"
 * ```
 */
export type _$multiplyTens<
  A extends Digit.Digit,
  B extends Digit.Digit
> = _$multiplyTens_LUT[A][B]

interface MultiplyTens_T<A extends Digit.Digit> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): _$multiplyTens<A, typeof x>
}

/**
 * `MultiplyTens` is a type-level function that takes in two single-digit
 * types, `A` and `B`, and returns the tens place of the product of `A` and `B`.
 *
 * @template A - A single-digit type.
 * @template B - A single-digit type.
 *
 * @example
 * For example, we can use `MultiplyTens` to compute the tens place of the
 * product of two single-digit types:
 *
 * We apply `MultiplyTens` to `"5"` and `"4"` respectively using the `$`
 * type-level applicator:
 *
 * ```ts
 * import { $, Digit } from "hkt-toolbelt"
 *
 * type Result = $<$<Digit.MultiplyTens, "5">, "4"> // "2"
 * ```
 */
export interface MultiplyTens extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): MultiplyTens_T<typeof x>
}
