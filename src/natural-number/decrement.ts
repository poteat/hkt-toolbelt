import { Type, Kind, DigitList, NaturalNumber, Number } from '..'

/**
 * `_$decrement` is a type-level function that takes in a natural number `A` and
 * returns a new natural number representing the result of decrementing the input
 * natural number by 1. If the input is zero, the result will be zero.
 *
 * @param {Number.Number} A - A natural number to decrement.
 * @returns {Number.Number} A natural number.
 *
 * @example
 * For example, we can use `_$decrement` to decrement the number 42 by 1.
 * In this example, the 42 is passed as a type argument to the type-level function:
 *
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = NaturalNumber._$decrement<42>; // 41
 * ```
 *
 * @example
 * We can also use `_$decrement` with zero as the input.
 * In this case, the output will also be zero.
 *
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = NaturalNumber._$decrement<0>; // 0
 * ```
 */
export type _$decrement<
  A extends Number.Number,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<A>,
  DECREMENT extends DigitList.DigitList = DigitList._$decrement<A_LIST>,
  RESULT extends Number.Number = Number._$fromString<
    DigitList._$toString<DECREMENT>
  >
> = RESULT

/**
 * `Decrement` is a type-level function that decrements a natural number type.
 * It returns the decremented number.
 *
 * @param {Number.Number} A - The natural number to decrement.
 * @returns {Number.Number} A natural number or `never`.
 *
 * If the input is not zero or a natural number, `never` is returned.
 *
 * @example
 * For example, we can use `Decrement` to decrement a natural number:
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = $<NaturalNumber.Decrement, 1>; // 0
 * ```
 *
 * @example
 * We can also use `Decrement` with zero as the input.
 * In this case, the output will also be zero.
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = $<NaturalNumber.Decrement, 0>; // 0
 * ```
 *
 * @example
 * If one of the inputs is not a natural number, `never` is returned.
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type IsNever = $<NaturalNumber.Decrement, -42.42>; // never
 * ```
 */
export interface Decrement extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? _$decrement<typeof x> : never
}
