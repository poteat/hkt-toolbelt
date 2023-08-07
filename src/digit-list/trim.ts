import { Type, Kind, DigitList } from "..";

type _$trim2<A extends DigitList.DigitList> = A extends [
  "0",
  ...infer Rest extends DigitList.DigitList
]
  ? _$trim2<Rest>
  : A;

/**
 * `_$trim` is a type-level function that trims leading zeros from a digit list.
 * It returns the trimmed digit list.
 *
 * @param A - The digit list to trim.
 * @param TRIM - The digit list after trimming leading zeros.
 * @param OUTPUT - The final output after trimming. If the trimmed list is empty, it returns ["0"].
 *
 * @example
 * For example, we can use `_$trim` to trim leading zeros from a digit list:
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Result = DigitList._$trim<["0", "1", "2", "3"]>; // ["1", "2", "3"]
 * ```
 *
 * In this example, `Result` is a type that represents the digit list ["1", "2", "3"], which is the result of trimming the leading zeros from the digit list ["0", "1", "2", "3"].
 *
 */
export type _$trim<
  A extends DigitList.DigitList,
  TRIM extends DigitList.DigitList = _$trim2<A>,
  OUTPUT extends DigitList.DigitList = TRIM extends [] ? ["0"] : TRIM
> = OUTPUT;

/**
 * `Trim` is a type-level function that trims leading zeros from a digit list.
 * It returns the trimmed digit list.
 *
 * @param x - A digit list to trim leading zeros from.
 *
 * @example
 * For example, we can use `Trim` to trim leading zeros from a digit list:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Result = $<DigitList.Trim, ["0", "5", "0", "2"]>; // ["5", "0", "2"]
 * ```
 *
 * In this example, `Result` is a type that represents the digit list ["5", "0", "2"], which is the result of trimming the leading zeros from the digit list ["0", "5", "0", "2"].
 */
export interface Trim extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$trim<typeof x>;
}
