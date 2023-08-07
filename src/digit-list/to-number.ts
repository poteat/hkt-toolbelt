import { DigitList, Kind, Number, Type } from '..'

/**
 * `_$toNumber` is a type-level function that converts a digit list to a number.
 * It returns the number from the digit list.
 *
 * @param T - The digit list to convert.
 * @param RESULT - The number that the digit list represents.
 *
 * @example
 * For example, we can use `_$toNumber` to convert a digit list to a number:
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Result = DigitList._$toNumber<["1", "2", "3"]>; // 123
 * ```
 *
 * In this example, `Result` is a type that represents the number 123, which is the result of converting the digit list ["1", "2", "3"] to a number.
 *
 */
export type _$toNumber<
  T extends DigitList.DigitList,
  RESULT extends Number.Number = T extends []
    ? never
    : Number._$fromString<DigitList._$toString<T>>
> = RESULT

/**
 * `ToNumber` is a type-level function that represents a function to convert a digit list to a number.
 * It returns the number from the digit list.
 *
 * @param x - A digit list to convert to a number.
 *
 * @example
 * For example, we can use `ToNumber` to convert a digit list to a number:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Result = $<DigitList.ToNumber, ["5", "0", "2"]>; // 502
 * ```
 *
 * In this example, `Result` is a type that represents the number 502, which is the result of converting the digit list ["5", "0", "2"] to a number.
 */
export interface ToNumber extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$toNumber<typeof x>
}
