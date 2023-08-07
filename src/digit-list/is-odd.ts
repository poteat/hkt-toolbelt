import { Type, Kind, Digit, DigitList } from '..';

/**
 * `_$isOdd` is a type-level function that checks if a digit list is odd.
 *
 * @param T - The digit list to check.
 * @param LAST - The last digit of T.
 *
 * @returns `true` if the digit list is odd, `false` otherwise.
 *
 * @example
 * ```ts
 * import { DigitList} from "hkt-toolbelt";
 *
 * type Result = DigitList._$isOdd<["1", "0"]>; // false
 * ```
 */
export type _$isOdd<
  T extends DigitList.DigitList,
  LAST extends Digit.Digit = DigitList._$last<T>
> = LAST extends '1' | '3' | '5' | '7' | '9' ? true : false;

/**
 * `IsOdd` is a type-level function that checks if a digit list is odd.
 * It returns a function that takes a digit list as a parameter and returns `true` if the digit list is odd, `false` otherwise.
 *
 * @param T - The digit list to check.
 *
 * @example
 * For example, we can use `IsOdd` to check if a digit list is odd:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Result = $<DigitList.IsOdd, ["1", "0"]>; // false
 * ```
 *
 * In this example, `Result` is a type that represents `false`, which indicates that the digit list ["1", "0"] is not odd.
 */
export interface IsOdd extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$isOdd<typeof x>;
}
