import { Digit, DecimalDigitList, DigitList, List, Number, Kind, Type, Boolean, NaturalNumber } from '..';

type _$add2<
  LONGER extends DecimalDigitList.DecimalDigitList,
  SHORTER extends DecimalDigitList.DecimalDigitList,
  SHORTER_LENGTH extends Number.Number,
  A_INT extends Number.Number = LONGER[0],
  B_INT extends Number.Number = SHORTER[0],
  INT_SUM extends Number.Number = NaturalNumber._$add<A_INT, B_INT>,
  A_DEC_FULL extends DigitList.DigitList = LONGER extends [A_INT, ...infer Rest] ? Rest : [],
  B_DEC extends DigitList.DigitList = SHORTER extends [B_INT, ...infer Rest] ? Rest : [],
  A_DEC extends DigitList.DigitList = List._$slice<[...A_DEC_FULL], [0, SHORTER_LENGTH]>,
  A_DEC_REM extends DigitList.DigitList = A_DEC_FULL extends [...A_DEC, ...infer Rest] ? Rest : never,
  SUM extends DigitList.DigitList = DigitList._$add<A_DEC, B_DEC>,
  HAS_CARRY extends Boolean = Number._$compare<SUM["length"], SHORTER_LENGTH> extends 1 ? true : false,
  OUTPUT_INT extends Number.Number = HAS_CARRY extends true ? NaturalNumber._$add<INT_SUM, DigitList._$toNumber<[SUM[0]]>> : INT_SUM,
  OUTPUT_DEC extends DigitList.DigitList = 
    HAS_CARRY extends true
      ? SUM extends [SUM[0], ...infer Rest] ? [...Rest, ...A_DEC_REM] : never
      : [...SUM, ...A_DEC_REM],
  OUTPUT extends DecimalDigitList.DecimalDigitList = [OUTPUT_INT, ...OUTPUT_DEC]
> = OUTPUT;

/**
 * `_$add` is a type-level function that takes in two digit lists `A` and `B`,
 * and returns the sum of the two digit lists as a new digit list.
 *
 * ## Parameters
 *
 * @param A A digit list.
 * @param B A digit list.
 *
 * ## Example
 *
 * @example
 *
 * For example, we can use `_$add` to add two digit lists representing the
 * numbers 123 and 456:
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Result = DigitList._$add<["1", "2", "3"], ["4", "5", "6"]>; // ["5", "7", "9"]
 * ```
 */
export type _$add<
  A extends DecimalDigitList.DecimalDigitList,
  B extends DecimalDigitList.DecimalDigitList,
  A_LENGTH extends Number.Number = A["length"],
  B_LENGTH extends Number.Number = B["length"],
  IS_A_LONGER extends Boolean = Number._$compare<A_LENGTH, B_LENGTH> extends 1 | 0 ? true : false,
  SUM = IS_A_LONGER extends true ? _$add2<A, B, NaturalNumber._$decrement<B_LENGTH>> : _$add2<B, A, NaturalNumber._$decrement<A_LENGTH>>,
  RESULT = SUM extends [] ? [Digit.Zero] : SUM
> = RESULT

interface Add_T<X extends DecimalDigitList.DecimalDigitList> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DecimalDigitList.DecimalDigitList>): _$add<X, typeof x>
}

/**
 * `Add` is a type-level function that takes in two digit lists `A` and `B`,
 * and returns the sum of the two digit lists as a new digit list.
 *
 * @param A A digit list.
 * @param B A digit list.
 *
 * @example
 *
 * For example, we can use `Add` to add two digit lists representing the
 * numbers 123 and 456:
 *
 * We apply `Add` to `["1", "2", "3"]` and `["4", "5", "6"]` respectively using
 * the `$` type-level applicator:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Result = $<$<DigitList.Add, ["1", "2", "3"]>, ["4", "5", "6"]>; // ["5", "7", "9"]
 * ```
 */
export interface Add extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DecimalDigitList.DecimalDigitList>): Add_T<typeof x>
}
