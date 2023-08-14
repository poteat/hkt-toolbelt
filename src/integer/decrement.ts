import { Type, Kind, DigitList, NaturalNumber, Number } from '..'

/**
 * `_$decrement` is a type-level function that takes in an integer `A` and
 * returns a new integer representing the result of decrementing the input
 * integer by 1.
 *
 * @param {Number.Number} A - An integer type.
 *
 * @example
 * For example, we can use `_$decrement` to decrement the number -42 by 1.
 * In this example, the -42 is passed as a type argument to the type-level function:
 *
 * ```ts
 * import { Integer } from "hkt-toolbelt";
 *
 * type Result = Integer._$decrement<-42>; // -43
 * ```
 *
 * @example
 * We can also use `_$decrement` with zero as the input.
 *
 * ```ts
 * import { Integer } from "hkt-toolbelt";
 *
 * type Result = Integer._$decrement<0>; // -1
 * ```
 */
export type _$decrement<
  A extends Number.Number,
  A_SGN extends '+' | '-' = Number._$sign<A>,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<
    Number._$absolute<A>
  >,
  DECREMENT extends DigitList.DigitList = A_SGN extends '+'
    ? DigitList._$decrement<A_LIST>
    : DigitList._$increment<A_LIST>,
  RESULT extends Number.Number = A_SGN extends '-'
    ? Number._$fromString<`-${DigitList._$toString<DECREMENT>}`>
    : Number._$fromString<DigitList._$toString<DECREMENT>>
> = RESULT

/**
 * `Decrement` is a type-level function that decrements an integer type.
 * It returns the decremented integer.
 *
 * @param {Number.Number} A - - The integer to decrement.
 *
 * If the input is not an integer, `never` is returned.
 *
 * @example
 * For example, we can use `Decrement` to decrement an integer:
 *
 * ```ts
 * import { $, Integer, Type } from "hkt-toolbelt";
 *
 * type Result = $<Integer.Decrement, 0>; // -1
 * ```
 *
 * @example
 * If the input is not an integer, `never` is returned.
 *
 * ```ts
 * import { Integer } from "hkt-toolbelt";
 *
 * type IsNever = $<Integer.Decrement, -42.42>; // never
 * ```
 */
export interface Decrement extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? _$decrement<typeof x> : never
}
