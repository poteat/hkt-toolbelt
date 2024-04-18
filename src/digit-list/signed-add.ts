import { DigitList } from '..'

/**
 * `_$signedAdd` is a type-level function that takes in two digit lists
 * `A` and `B`, as well as their respective signs, and returns a 2-tuple
 * composed of the resultant sign and summation digit list.
 *
 * @template {DigitList.DigitList} A - The first digit list to add.
 * @template {DigitList.DigitList} B - The second digit list to add.
 * @template {"+" | "-"} A_SIGN - The sign of the first digit list, `A`.
 * @template {"+" | "-"} B_SIGN - The sign of the second digit list, `B`.
 * @returns {Number.Number} An integer type or `never`.
 *
 * This utility is useful for performing more efficient composite operations
 * by avoiding conversion between `DigitList` and `Integer` representations.
 *
 * @example
 * For example, we can use `_$signedAdd` to add the two integers -123 and 456:
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt"
 *
 * type Result = DigitList._$signedAdd<
 *  ["1", "2", "3"],
 *  ["4", "5", "6"], "-", "+"
 *  > // ["+", ["3", "3", "3"]]
 * ```
 */
export type _$signedAdd<
  /**
   * The first digit list to add.
   */
  A extends DigitList.DigitList,
  /**
   * The second digit list to add.
   */
  B extends DigitList.DigitList,
  /**
   * The sign of the first digit list, `A`.
   */
  A_SIGN extends '+' | '-',
  /**
   * The sign of the second digit list, `B`.
   */
  B_SIGN extends '+' | '-',
  /**
   * The result of comparing A and B.
   */
  COMPARE extends 1 | 0 | -1 = DigitList._$compare<A, B>,
  /**
   * The magnitude sum of the two digit lists, not including the
   * actual resultant sign. If the signs of the two input lists
   * are equivalent, we can merely add.
   *
   * If the signs are different, we subtract the smaller (in
   * magnitude) value from the larger value.
   */
  SUM extends DigitList.DigitList = A_SIGN extends B_SIGN
    ? DigitList._$add<A, B>
    : COMPARE extends 1
      ? DigitList._$subtract<A, B>
      : DigitList._$subtract<B, A>,
  /**
   * The resultant sign. If both signs are the same, then the
   * resultant sign will be that sign. If the signs are different,
   * then the resultant sign is the sign of the number which was
   * larger in magnitude.
   */
  SIGN extends '+' | '-' = A_SIGN extends B_SIGN
    ? A_SIGN
    : COMPARE extends 0
      ? '+'
      : COMPARE extends 1
        ? A_SIGN
        : B_SIGN
> = [SIGN, SUM]
