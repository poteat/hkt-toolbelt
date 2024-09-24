import { Digit, Kind, Type } from '..'

/**
 * `_$subtractTens_LUT` is a lookup table used internally by `_$subtractTens`
 * to compute the result of subtracting two digits in the tens place.
 */
type _$subtractTens_LUT = [
  ['0', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
  ['0', '0', '1', '1', '1', '1', '1', '1', '1', '1'],
  ['0', '0', '0', '1', '1', '1', '1', '1', '1', '1'],
  ['0', '0', '0', '0', '1', '1', '1', '1', '1', '1'],
  ['0', '0', '0', '0', '0', '1', '1', '1', '1', '1'],
  ['0', '0', '0', '0', '0', '0', '1', '1', '1', '1'],
  ['0', '0', '0', '0', '0', '0', '0', '1', '1', '1'],
  ['0', '0', '0', '0', '0', '0', '0', '0', '1', '1'],
  ['0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
  ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
]

/**
 * `_$subtractTens` is a type-level function that takes in two digit types, `A`
 * and `B`, and returns the result of subtracting `B` from `A` in the tens
 * place. If `B` is greater than `A`, the result is 1.
 *
 * @template {Digit} A - A digit type, the minuend.
 * @template {Digit} B - A digit type, the subtrahend.
 *
 * @example
 * For example, we can use `_$subtractTens` to subtract two digit types in the
 * tens place:
 *
 * ```ts
 * import { Digit } from "hkt-toolbelt"
 *
 * type Result = Digit._$subtractTens<"2", "9"> // "1"
 * ```
 */
export type _$subtractTens<
  A extends Digit.Digit,
  B extends Digit.Digit
> = _$subtractTens_LUT[A][B]

/**
 * `SubtractTens_T` is an internal type used by `SubtractTens` to compute the
 * result of subtracting two digit types in the tens place.
 */
interface SubtractTens_T<A extends Digit.Digit> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): _$subtractTens<A, typeof x>
}

/**
 * `SubtractTens` is a type-level function that takes in two digit types, `A`
 * and `B`, and returns the result of subtracting `B` from `A` in the tens
 * place. If `B` is greater than `A`, the result is 1.
 *
 * @template {Digit} A - A digit type, the minuend.
 * @template {Digit} B - A digit type, the subtrahend.
 *
 * @example
 * For example, we can use `SubtractTens` to subtract two digit types in the
 * tens place:
 *
 * We apply `SubtractTens` to `"2"` and `"9"` respectively using the `$`
 * type-level applicator:
 *
 * ```ts
 * import { $, Digit } from "hkt-toolbelt"
 *
 * type Result = $<$<Digit.SubtractTens, "2">, "9"> // "1"
 * ```
 */
export interface SubtractTens extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): SubtractTens_T<typeof x>
}
