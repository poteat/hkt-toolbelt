import { Type, Kind, DigitList } from "..";

/**
 * `_$shift` is a type-level function that removes the first digit from a digit list.
 * It returns the result of the shift operation.
 *
 * ## Parameters
 *
 * @param T - The digit list.
 *
 * @example
 *
 * For example, we can use `_$shift` to remove the first digit from a digit list:
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 * 
 * type Result = DigitList._$shift<["1", "2", "3"]>; // ["2", "3"]
 * ```
 *
 * In this example, `Result` is a type that represents ["2", "3"], which is the result of removing the first digit from ["1", "2", "3"].
 *
 */
export type _$shift<T extends DigitList.DigitList> = T extends []
  ? []
  : T extends [unknown, ...infer X]
  ? X
  : [];

/**
 * `Shift` is a type-level function that removes the first digit from a digit list.
 * It returns the result of the shift operation.
 *
 * @example
 *
 * For example, we can use `Shift` to remove the first digit from a digit list:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Result = $<DigitList.Shift, ["1", "2", "3"]>; // ["2", "3"]
 * ```
 *
 * In this example, `Result` is a type that represents ["2", "3"], which is the result of removing the first digit from ["1", "2", "3"].
 */
export interface Shift extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$shift<typeof x>;
}
