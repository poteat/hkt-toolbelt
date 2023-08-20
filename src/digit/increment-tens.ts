import { Type, Digit, Kind } from '..'

/**
 * `_$incrementTens_LUT` is a type-level lookup table that maps a digit type to
 * its tens place increment. In practice, only the ninth digit gets mapped to
 * "1", and all other digits get mapped to "0".
 */
type _$incrementTens_LUT = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '1']

/**
 * `_$incrementTens` is a type-level function that takes a digit type `A` as
 * input and returns the tens place increment for that digit. If the input digit
 * is "9", it returns "1", otherwise, it returns "0". The result can be used for
 * incrementing a tens place in a number string.
 *
 * @template A - A digit type.
 *
 * @example
 * For example, incrementing a digit "9" will result in the tens place increment
 * of "1":
 *
 * ```ts
 * import { Digit } from "hkt-toolbelt";
 *
 * type Result = Digit._$incrementTens<"9"> // "1"
 * ```
 *
 * Incrementing a digit "5" will result in the tens place increment of "0":
 *
 * ```ts
 * import { Digit } from "hkt-toolbelt";
 *
 * type Result = Digit._$incrementTens<"5"> // "0"
 * ```
 */
export type _$incrementTens<A extends Digit.Digit> = _$incrementTens_LUT[A]

/**
 * `IncrementTens` is a type-level function that takes a digit type `A` as
 * input and returns the tens place increment for that digit.
 *
 * @template A - A digit type.
 *
 * @example
 * We apply `IncrementTens` to a digit using the `$` type-level applicator:
 *
 * ```ts
 * import { $, Digit } from "hkt-toolbelt";
 *
 * type Result = $<Digit.IncrementTens, "9">; // "1"
 * ```
 */
export interface IncrementTens extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): _$incrementTens<typeof x>
}
