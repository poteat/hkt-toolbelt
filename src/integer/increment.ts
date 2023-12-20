import { Type, Kind, DigitList, NaturalNumber, Number } from '..'

/**
 * `_$increment` is a type-level function that takes in an integer `A` and
 * returns a new integer representing the result of incrementing the input
 * integer by 1.
 *
 * @template {Number.Number} A - An integer type.
 *
 * @example
 * For example, we can use `_$increment` to increment the number -42 by 1.
 * In this example, the -42 is passed as a type argument to the type-level function:
 *
 * ```ts
 * import { Integer } from "hkt-toolbelt";
 *
 * type Result = Integer._$increment<-42>; // -41
 * ```
 *
 * @example
 * We can also use `_$increment` with zero as the input.
 *
 * ```ts
 * import { Integer } from "hkt-toolbelt";
 *
 * type Result = Integer._$increment<0>; // 1
 * ```
 */
export type _$increment<
  A extends Number.Number,
  A_SGN extends '+' | '-' = Number._$sign<A>,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<
    Number._$absolute<A>
  >,
  INCREMENT extends DigitList.DigitList = A_SGN extends '+'
    ? DigitList._$increment<A_LIST>
    : DigitList._$decrement<A_LIST>,
  RESULT extends Number.Number = A_SGN extends '-'
    ? Number._$fromString<`-${DigitList._$toString<INCREMENT>}`>
    : Number._$fromString<DigitList._$toString<INCREMENT>>
> = RESULT

/**
 * `Increment` is a type-level function that increments an integer type.
 * It returns the incremented integer.
 *
 * @template {Number.Number} A - - The integer to increment.
 *
 * If the input is not an integer, `never` is returned.
 *
 * @example
 * For example, we can use `Increment` to increment an integer:
 *
 * ```ts
 * import { $, Integer, Type } from "hkt-toolbelt";
 *
 * type Result = $<Integer.Increment, -10>; // -9
 * ```
 *
 * @example
 * If the input is not an integer, `never` is returned.
 *
 * ```ts
 * import { Integer } from "hkt-toolbelt";
 *
 * type IsNever = $<Integer.Increment, -42.42>; // never
 * ```
 */
export interface Increment extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? _$increment<typeof x> : never
}
