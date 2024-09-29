import { Digit, Kind, Type } from '..'

/**
 * `_$subtract_LUT` is a lookup table that contains the results of all possible
 * single digit subtractions. It is used internally by `_$subtract` to compute
 * the result of subtracting two digits.
 *
 * For example, the result of subtracting "3" from "5" is "2", which is located
 * at `_$subtract_LUT[5][3]`. Thereby, A - B is represented via
 * `_$subtract_LUT[A][B]`.
 */
type _$subtract_LUT = [
  ['0', '9', '8', '7', '6', '5', '4', '3', '2', '1'],
  ['1', '0', '9', '8', '7', '6', '5', '4', '3', '2'],
  ['2', '1', '0', '9', '8', '7', '6', '5', '4', '3'],
  ['3', '2', '1', '0', '9', '8', '7', '6', '5', '4'],
  ['4', '3', '2', '1', '0', '9', '8', '7', '6', '5'],
  ['5', '4', '3', '2', '1', '0', '9', '8', '7', '6'],
  ['6', '5', '4', '3', '2', '1', '0', '9', '8', '7'],
  ['7', '6', '5', '4', '3', '2', '1', '0', '9', '8'],
  ['8', '7', '6', '5', '4', '3', '2', '1', '0', '9'],
  ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0']
]

/**
 * `_$subtract` is a type-level function that takes in two digit types, `A` and
 * `B`, and returns the digit result of subtracting `B` from `A`. The
 * subtraction is performed using a lookup table (`_$subtract_LUT`), which
 * contains the results of all possible digit subtractions.
 *
 * @template {Digit} A - A digit type, the minuend.
 * @template {Digit} B - A digit type, the subtrahend.
 *
 * @example
 * For example, we can use `_$subtract` to subtract two digit types. In this
 * example, "2" and "1" are passed as type arguments to the type-level function:
 *
 * ```ts
 * import { Digit } from "hkt-toolbelt"
 *
 * type Result = Digit._$subtract<"2", "1"> // "1"
 * ```
 */
export type _$subtract<
  A extends Digit.Digit,
  B extends Digit.Digit
> = _$subtract_LUT[A][B]

interface Subtract_T<A extends Digit.Digit> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): _$subtract<A, typeof x>
}

/**
 * `Subtract` is a type-level function that takes in two digit types, `A` and
 * `B`, and returns the digit result of subtracting `B` from `A`.
 *
 * @template {Digit} A - A digit type, the minuend.
 * @template {Digit} B - A digit type, the subtrahend.
 *
 * @example
 * For example, we can use `Subtract` to subtract two digit types. In this
 * example, "2" and "1" are passed as type arguments to the type-level function:
 *
 * We apply `Subtract` to "2" and "1" respectively using the `$` type-level
 * applicator:
 *
 * ```ts
 * import { $, Digit } from "hkt-toolbelt"
 *
 * type Result = $<$<Digit.Subtract, "2">, "1"> // "1"
 * ```
 */
export interface Subtract extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): Subtract_T<typeof x>
}
