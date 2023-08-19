import { Type, Kind, DigitList } from '..'

type _$trimRight2<A extends DigitList.DigitList> = A extends [
  ...infer Rest extends DigitList.DigitList,
  '0'
]
  ? _$trimRight2<Rest>
  : A

/**
 * `_$trimRight` is a type-level function that trims trailing zeros from a digit list.
 * It returns the trimmed digit list.
 *
 * @param A - The digit list to trim.
 * @param TRIM - The digit list after trimming trailing zeros.
 * @param OUTPUT - The final output after trimming. If the trimmed list is empty, it returns ["0"].
 *
 * @example
 * For example, we can use `_$trimRight` to trim trailing zeros from a digit list:
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Result = DigitList._$trimRight<["1", "2", "3", "0"]>; // ["1", "2", "3"]
 * ```
 *
 * In this example, `Result` is a type that represents the digit list ["1", "2", "3"], which is the result of trimming the trailing zeros from the digit list ["1", "2", "3", "0"].
 *
 */
export type _$trimRight<
  A extends DigitList.DigitList,
  TRIM extends DigitList.DigitList = _$trimRight2<A>,
  OUTPUT extends DigitList.DigitList = TRIM extends [] ? ['0'] : TRIM
> = OUTPUT

/**
 * `TrimRight` is a type-level function that trims trailing zeros from a digit list.
 * It returns the trimmed digit list.
 *
 * @param x - A digit list to trim trailing zeros from.
 *
 * @example
 * For example, we can use `TrimRight` to trim trailing zeros from a digit list:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Result = $<DigitList.TrimRight, ["3", "0", "0"]>; // ["3"]
 * ```
 */
export interface TrimRight extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$trimRight<typeof x>
}
