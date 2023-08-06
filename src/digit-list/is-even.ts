import { Type, Kind, Digit, DigitList } from "..";

/**
 * `_$isEven` is a type-level function that checks if a digit list is even.
 * It returns `true` if the digit list is even, `false` otherwise.
 *
 * ## Parameters
 *
 * @param T - The digit list to check.
 * @param LAST - The last digit of T.
 *
 * @example
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Result = DigitList._$isEven<["1", "0"]>; // true
 * ```
 */
export type _$isEven<
  T extends DigitList.DigitList,
  LAST extends Digit.Digit = DigitList._$last<T>
> = LAST extends Digit.Zero | "2" | "4" | "6" | "8" ? true : false;

/**
 * `IsEven` is a type-level function that checks if a digit list is even.
 * It returns `true` if the digit list is even, `false` otherwise.
 *
 * ## Parameters
 *
 * @param T - The digit list to check.
 *
 * @example
 *
 * For example, we can use `IsEven` to check if a digit list is even:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Result = $<DigitList.IsEven, ["1", "0"]>; // true
 * ```
 *
 * In this example, `Result` is a type that represents `true`, which indicates that the digit list ["1", "0"] is even.
 */
export interface IsEven extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$isEven<typeof x>;
}
