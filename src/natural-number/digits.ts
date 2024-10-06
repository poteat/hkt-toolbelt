import { Kind, Number as Number_, Type } from '..'

type _$stringToDigitMap = {
  '0': 0
  '1': 1
  '2': 2
  '3': 3
  '4': 4
  '5': 5
  '6': 6
  '7': 7
  '8': 8
  '9': 9
}

/**
 * Given a natural number, return the list of digits.
 *
 * @param {number} x - The natural number to convert to a list of digits.
 *
 * Similar to `NaturalNumber.ToList`, but returns the list of digits as numbers
 * instead of strings.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = NaturalNumber._$digits<42>; // [4, 2]
 * //    ^? [4, 2]
 */
export type _$digits<
  S extends Number_.Number,
  O extends number[] = []
> = 0 extends 1
  ? never
  : Number_._$toString<S> extends `${infer Head}${infer Tail}`
    ? _$digits<
        Tail,
        Head extends keyof _$stringToDigitMap
          ? [...O, _$stringToDigitMap[Head]]
          : never
      >
    : O extends []
      ? never
      : O

/**
 * Given a natural number, return the list of digits.
 *
 * @param {number} x - The natural number to convert to a list of digits.
 *
 * Similar to `NaturalNumber.ToList`, but returns the list of digits as numbers
 * instead of strings.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = $<NaturalNumber.Digits, 42>; // [4, 2]
 * //   ^? [4, 2]
 * ```
 */
export interface Digits extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number_.Number>): _$digits<typeof x>
}

/**
 * Given a natural number, return the list of digits.
 *
 * @param {number} x - The natural number to convert to a list of digits.
 *
 * Similar to `NaturalNumber.ToList`, but returns the list of digits as numbers
 * instead of strings.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * const result = NaturalNumber.digits(42)
 * //    ^? [4, 2]
 * ```
 */
export const digits = ((x: Number_.Number) =>
  Number.isInteger(x) && Number(x) >= 0
    ? `${x}`.split('').map((d) => Number(d))
    : Type.never) as Kind._$reify<Digits>
