import { Type, Kind, Digit, DigitList } from '..'

/**
 * `_$last` is a type-level function that gets the last digit of a digit list.
 * It returns the last digit of the digit list. If the list is empty, it returns "0".
 *
 * @template A - The digit list to get the last digit from.
 *
 * @example
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Result = DigitList._$last<["1", "2", "3"]>; // "3"
 * ```
 */
export type _$last<T extends DigitList.DigitList> = T extends []
  ? Digit.Zero
  : T extends [...unknown[], infer X]
    ? X
    : Digit.Zero

/**
 * `Last` is a type-level function that gets the last digit of a digit list.
 * It returns the last digit of the digit list. If the list is empty, it returns "0".
 *
 * @template A - The digit list to get the last digit from.
 *
 * @example
 * For example, we can use `Last` to get the last digit of a digit list:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Result = $<DigitList.Last, ["1", "2", "3"]>; // "3"
 * ```
 *
 * In this example, `Result` is a type that represents "3", which is the last digit of the digit list ["1", "2", "3"].
 */
export interface Last extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$last<typeof x>
}
