import { Type, Kind, DigitList, NaturalNumber, Number } from '..'

/**
 * `_$increment` is a type-level function that takes in a natural number `A` and
 * returns a new natural number representing the result of incrementing the input
 * natural number by 1. If the input is zero, the result will be zero.
 *
 * @param {Number.Number} A - A natural number to increment.
 * @returns {Number.Number} A natural number.
 *
 * @example
 * For example, we can use `_$increment` to increment the number 42 by 1.
 * In this example, the 42 is passed as a type argument to the type-level function:
 *
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = NaturalNumber._$increment<42>; // 43
 * ```
 *
 * @example
 * We can also use `_$increment` with zero as the input.
 *
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = NaturalNumber._$increment<0>; // 1
 * ```
 */
export type _$increment<
  A extends Number.Number,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<A>,
  INCREMENT extends DigitList.DigitList = DigitList._$increment<A_LIST>,
  RESULT extends Number.Number = Number._$fromString<
    DigitList._$toString<INCREMENT>
  >
> = RESULT

/**
 * `Increment` is a type-level function that increments a natural number type.
 * It returns the incremented natural number.
 *
 * @param {Number.Number} A - A natural number to increment.
 * @returns {Number.Number} A natural number or `never`.
 *
 * If the input is not zero or a natural number, `never` is returned.
 *
 * @example
 * For example, we can use `Increment` to increment a natural number:
 *
 * ```ts
 * import { $, NaturalNumber, Type } from "hkt-toolbelt";
 *
 * type Result = $<NaturalNumber.Increment, 10>; // 11
 * ```
 *
 * @example
 * If the input is not a natural number, `never` is returned.
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type IsNever = $<NaturalNumber.Increment, -42.42>; // never
 * ```
 */
export interface Increment extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? _$increment<typeof x> : never
}
