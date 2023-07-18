import { Type, Kind, DigitList } from "..";

/**
 * `_$pop` is a type-level function that removes the last digit from a digit list.
 * It returns the digit list after the last digit has been removed.
 * 
 * ## Parameters
 *
 * @param A - The digit list.
 *
 * @example
 *
 * For example, we can use `_$pop` to remove the last digit from a digit list:
 *
 * ```ts
 *  import { DigitList } from "hkt-toolbelt";
 * 
 * type Result = DigitList._$pop<["1", "2", "3"]>; // ["1", "2"]
 * ```
 *
 * In this example, `Result` is a type that represents ["1", "2"], which is the result of removing the last digit from ["1", "2", "3"].
 *
 */
export type _$pop<T extends DigitList.DigitList> = T extends []
  ? []
  : T extends [...infer X, unknown]
  ? X
  : [];

/**
 * `Pop` is a type-level function that removes the last digit from a digit list.
 * It returns the digit list after the last digit has been removed.
 *
 * ## Parameters
 *
 * @param A - The digit list.
 * 
 * @example
 *
 * For example, we can use `Pop` to remove the last digit from a digit list:
 *
 * ```ts
 * import { $, DigitList, Type } from "hkt-toolbelt";
 *
 * type Result = $<DigitList.Pop, ["1", "2", "3"]>; // ["1", "2"]
 * ```
 *
 * In this example, `Result` is a type that represents ["1", "2"], which is the result of removing the last digit from ["1", "2", "3"].
 */
export interface Pop extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$pop<typeof x>;
}
