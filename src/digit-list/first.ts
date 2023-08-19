import { Digit, DigitList, Kind, Type } from '../'

/**
 * `_$first` is a type-level function that returns the first digit of a digit list.
 * If the list is empty, it returns ["0"].
 *
 * @param T - The digit list to extract the first digit from.
 *
 * @example
 * ```ts
 * import { $, DigitList, Type } from "hkt-toolbelt";
 *
 * type Result = DigitList._$first<["1", "2", "3"]>; // "1"
 * ```
 */
export type _$first<T extends DigitList.DigitList> = T extends []
  ? Digit.Zero
  : T extends [infer X, ...unknown[]]
  ? X
  : Digit.Zero

/**
 * `First` is a type-level function that returns the first digit of a digit list.
 * It returns the first digit of the digit list. If the list is empty, it returns ["0"].
 *
 * @example
 * For example, we can use `First` to get the first digit of a digit list representing the number 12:
 *
 * ```ts
 * import { $, DigitList, Type } from "hkt-toolbelt";
 *
 * type Result = $<DigitList.First, ["1", "2"]>; // "1"
 * ```
 *
 * In this example, `Result` is a type that represents the digit "1", which is the first digit of the digit list ["1", "2"].
 */
export interface First extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$first<typeof x>
}
