import { Type, Kind, DigitList } from '..'

type _$toString2<
  T extends DigitList.DigitList,
  O extends string = ''
> = T extends []
  ? O
  : _$toString2<DigitList._$pop<T>, `${DigitList._$last<T>}${O}`>

/**
 * `_$toString` is a type-level function that converts a digit list to a string.
 * It returns the string representation of the digit list.
 *
 * @template T - The digit list to convert.
 * @template JOIN - The string that joins the digits in the list.
 * @template RESULT - The string that the digit list represents.
 *
 * @example
 * For example, we can use `_$toString` to convert a digit list to a string:
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Result = DigitList._$toString<["1", "2", "3"]>; // "123"
 * ```
 *
 * In this example, `Result` is a type that represents the string "123", which is the result of converting the digit list ["1", "2", "3"] to a string.
 *
 */
export type _$toString<
  T extends DigitList.DigitList,
  JOIN = _$toString2<T>,
  RESULT = JOIN extends '' ? '0' : JOIN
> = RESULT

/**
 * `ToString` is a type-level function that converts a digit list to a string.
 * It returns the string representation of the digit list.
 *
 * @template A - A digit list to convert to a string.
 *
 * @example
 * For example, we can use `ToString` to convert a digit list to a string:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Result = $<DigitList.ToString, ["5", "0", "2"]>; // "502"
 * ```
 *
 * In this example, `Result` is a type that represents the string "502", which is the result of converting the digit list ["5", "0", "2"] to a string.
 */
export interface ToString extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$toString<typeof x>
}
