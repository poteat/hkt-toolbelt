import { Digit, DigitList, Kind, Type } from "..";

type _$subtract2<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList,
  CARRY extends Digit.Digit = "0",
  OUTPUT extends DigitList.DigitList = [],
  A_LAST extends Digit.Digit = DigitList._$last<A>,
  B_LAST extends Digit.Digit = DigitList._$last<B>,
  A_NEXT extends DigitList.DigitList = DigitList._$pop<A>,
  B_NEXT extends DigitList.DigitList = DigitList._$pop<B>,
  SUB extends Digit.Digit = Digit._$subtract<A_LAST, B_LAST>,
  SUB_TENS extends Digit.Digit = Digit._$subtractTens<A_LAST, B_LAST>,
  SUB_CARRY extends Digit.Digit = Digit._$subtract<SUB, CARRY>,
  SUB_CARRY_TENS extends Digit.Digit = Digit._$subtractTens<SUB, SUB_CARRY>,
  CARRY_NEXT extends Digit.Digit = SUB_TENS extends "1" ? "1" : SUB_CARRY_TENS,
  OUTPUT_NEXT extends DigitList.DigitList = [SUB_CARRY, ...OUTPUT],
  DONE = A extends [] ? (B extends [] ? true : false) : false,
  RESULT = CARRY extends "1" ? ["0"] : OUTPUT
> = DONE extends true
  ? RESULT
  : _$subtract2<A_NEXT, B_NEXT, CARRY_NEXT, OUTPUT_NEXT>;

/**
 * `_$subtract` is a type-level function that subtracts one digit list from another.
 * It returns the result of the subtraction.
 *
 * @param A - A digit list representing a number to substract.
 * @param B - A digit list representing a number to substract by.
 *
 * @example
 * For example, we can use `_$subtract` to subtract one digit list from another:
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Result = DigitList._$subtract<["1", "2", "5"], ["1", "2", "1"]>; // ["4"]
 * ```
 *
 * In this example, `Result` is a type that represents ["4"], which is the result of subtracting ["1", "2", "5"] from ["1", "2", "1"].
 *
 */
export type _$subtract<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList
> = DigitList._$trim<_$subtract2<A, B>>;

interface Subtract_T<X extends DigitList.DigitList> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$subtract<X, typeof x>;
}

/**
 * `Subtract` is a type-level function that subtracts one digit list from another.
 * It returns the result of the subtraction.
 *
 * @param A - A digit list representing a number to substract.
 * @param B - A digit list representing a number to substract by.
 * 
 * @example
 * For example, we can use `Subtract` to subtract one digit list from another:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Result = $<DigitList.Subtract, ["5", "0"], ["2", "5"]>; // ["2", "5"]
 * ```
 *
 * In this example, `Result` is a type that represents ["2", "5"], which is the result of subtracting ["2", "5"] from ["5", "0"].
 */
export interface Subtract extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): Subtract_T<typeof x>;
}
