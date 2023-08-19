import { Digit, DigitList, Kind, NaturalNumber, Type } from '../'

type _$compare3<
  /**
   * The first digit list to compare. This implements an 'is greater than'
   * operation, such that A > B --> 1, A = B --> 0, A < B --> -1.
   */
  A extends DigitList.DigitList,
  /**
   * The second digit list to compare.
   */
  B extends DigitList.DigitList,
  /**
   * The length of list A, as a digit list. We use this as a shortcut, in that
   * if Len(A) > Len(B), then A > B, and if Len(A) < Len(B), then A < B.
   *
   * Interestingly, we also compare the lengths using this method, which makes
   * this approach a wonderful little example of recursion.
   */
  A_LENGTH extends DigitList.DigitList = NaturalNumber._$toList<A['length']>,
  /**
   * The length of list B, as a digit list.
   */
  B_LENGTH extends DigitList.DigitList = NaturalNumber._$toList<B['length']>,
  /**
   * Whether or not the lengths of the two digit lists are the same. If they
   * aren't the same length, then we have made a lot of progress in determining
   * which digit list is greater than the other.
   */
  IS_SAME_LENGTH extends boolean = A_LENGTH extends B_LENGTH ? true : false,
  /**
   * Whether or not both digit lists are single digits. If they are, then we can
   * compare them directly. This is the base case of the recursion.
   */
  BOTH_SINGLE_DIGIT extends boolean = A['length'] extends 1
    ? B['length'] extends 1
      ? true
      : false
    : false,
  /**
   * The first digit of the first digit list. This is used to compare the first
   * digits of the two digit lists. We do this if the lists are the same length,
   * or if they are both single digits.
   *
   * This is because _if_ Len(A) = Len(B), then A[0] > B[0] --> A > B, and
   * A[0] < B[0] --> A < B. In other words, the "left-most" digit is the most
   * significant digit.
   */
  A_FIRST extends Digit.Digit = DigitList._$first<A>,
  /**
   * The first digit of the second digit list. This is the 'most significant'
   * digit of B.
   */
  B_FIRST extends Digit.Digit = DigitList._$first<B>,
  /**
   * The next copy of the first digit list that we pass to the recursive call.
   */
  A_NEXT extends DigitList.DigitList = DigitList._$shift<A>,
  /**
   * The next copy of the second digit list that we pass to the recursive call.
   */
  B_NEXT extends DigitList.DigitList = DigitList._$shift<B>,
  /**
   * The comparison result of A[0] vs. B[0]. This calls out to the `Digit`
   * compare function, which is based on a 10x10 lookup table.
   */
  COMP extends 1 | 0 | -1 = Digit._$compare<A_FIRST, B_FIRST>,
  /**
   * The final result of the comparison. This is the result of the recursive
   * call.
   *
   * First of all, if the lists are different lengths, then we can just invoke
   * ourselves with the respective _length_ of each list. This is because if
   * Len(A) > Len(B), then A > B, and if Len(A) < Len(B), then A < B.
   *
   * If the lists are both empty, this shows that the digits are equal.
   */
  RESULT extends 1 | 0 | -1 = IS_SAME_LENGTH extends false
    ? _$compare3<A_LENGTH, B_LENGTH>
    : A extends []
    ? B extends []
      ? 0
      : -1
    : B extends []
    ? 1
    : BOTH_SINGLE_DIGIT extends true
    ? COMP
    : COMP extends 0
    ? _$compare3<A_NEXT, B_NEXT>
    : COMP
> = RESULT

type _$compare2<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList
> = A extends B ? 0 : _$compare3<A, B>

/**
 * `_$compare` is a type-level function that takes in two digit lists `A` and
 * `B`, and returns the comparison result as a number type. The result will be
 * 1 if `A` is greater than `B`, 0 if `A` is equal to `B`, and -1 if `A` is
 * less than `B`.
 *
 * @param A - A digit list type.
 * @param B - A digit list type.
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
> = RESULT

interface Compare_T<X extends DigitList.DigitList> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$compare<X, typeof x>
}

/**
 * `Compare` is a type-level function that takes in two digit lists `A` and
 * `B`, and returns the comparison result as a number type. The result will be
 * 1 if `A` is greater than `B`, 0 if `A` is equal to `B`, and -1 if `A` is
 * less than `B`.
 *
 * @param A - A digit list type.
 * @param B - A digit list type.
 *
 * @example
 *
 * For example, we can use the `$` type-level applicator to apply `Compare` to
 * two digit lists.
 *
 * In this example, we compare the digit lists ["1", "2", "3"] and ["3", "2",
 * "1"]:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt"
 *
 * type Result = $<$<DigitList.Compare, ["1", "2", "3"]>, ["3", "2", "1"]> // -1
 * ```
 */
export interface Compare extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): Compare_T<typeof x>
}
