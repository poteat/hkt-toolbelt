import { Boolean, Digit, DigitList, Kind, NaturalNumber, Type } from '../';

type _$compare2<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList,
  A_LENGTH extends DigitList.DigitList = NaturalNumber._$toList<A['length']>,
  B_LENGTH extends DigitList.DigitList = NaturalNumber._$toList<B['length']>,
  IS_SAME_LENGTH extends boolean = A_LENGTH extends B_LENGTH ? true : false,
  BOTH_SINGLE_DIGIT extends boolean = Boolean._$and<
    A_LENGTH extends ['1'] ? true : false,
    B_LENGTH extends ['1'] ? true : false
  >,
  A_FIRST extends Digit.Digit = DigitList._$first<A>,
  B_FIRST extends Digit.Digit = DigitList._$first<B>,
  A_NEXT extends DigitList.DigitList = DigitList._$shift<A>,
  B_NEXT extends DigitList.DigitList = DigitList._$shift<B>,
  COMP extends 1 | 0 | -1 = Digit._$compare<A_FIRST, B_FIRST>,
  RESULT extends 1 | 0 | -1 = IS_SAME_LENGTH extends false
    ? _$compare2<A_LENGTH, B_LENGTH>
    : A extends []
    ? B extends []
      ? 0
      : -1
    : B extends []
    ? 1
    : BOTH_SINGLE_DIGIT extends true
    ? Digit._$compare<A_FIRST, B_FIRST>
    : COMP extends 0
    ? _$compare2<A_NEXT, B_NEXT>
    : COMP
> = RESULT;

/**
 * `_$compare` is a type-level function that takes in two digit lists `A` and
 * `B`, and returns the comparison result as a number type. The result will be
 * 1 if `A` is greater than `B`, 0 if `A` is equal to `B`, and -1 if `A` is
 * less than `B`.
 *
 * @param A A digit list type.
 * @param B A digit list type.
 *
 * @example
 * For example, we can use `_$compare` to compare two digit lists. In this
 * example, we compare the digit lists ["1", "2", "3"] and ["3", "2", "1"]:
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Result = DigitList._$compare<["1", "2", "3"], ["3", "2", "1"]>; // -1
 * ```
 *
 * We can also use the `Compare` higher-order type with the `$` type-level
 * applicator to achieve the same result:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Result = $<$<DigitList.Compare, ["1", "2", "3"]>, ["3", "2", "1"]>; // -1
 * ```
 */
export type _$compare<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList,
  RESULT extends 1 | 0 | -1 = _$compare2<A, B>
> = RESULT;

interface Compare_T<X extends DigitList.DigitList> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$compare<X, typeof x>
}

/**
 * `Compare` is a type-level function that takes in two digit lists `A` and
 * `B`, and returns the comparison result as a number type. The result will be
 * 1 if `A` is greater than `B`, 0 if `A` is equal to `B`, and -1 if `A` is
 * less than `B`.
 *
 * @param A A digit list type.
 * @param B A digit list type.
 *
 * @example
 * For example, we can use the `$` type-level applicator to apply `Compare` to two digit lists.
 * In this example, we compare the digit lists ["1", "2", "3"] and ["3", "2", "1"]:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Result = $<$<DigitList.Compare, ["1", "2", "3"]>, ["3", "2", "1"]>; // -1
 * ```
 */
export interface Compare extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): Compare_T<typeof x>
}
