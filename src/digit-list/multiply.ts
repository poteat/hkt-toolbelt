import { Digit, DigitList, Kind, Type } from '..'

/**
 * For each digit in the multiplicand, from right to left, we multiply the digit
 * by the multiplier, shift the result to the left by the number of zeroes
 * equivalent to the position of the digit, and add the result to the sum of the
 * partial products.
 *
 * Once we have processed all of the digits in the multiplicand, we return the
 * sum of the partial products.
 *
 * This is a type-level implementation of the traditional multiplication
 * algorithm, and is O(n^2) in the number of digits.
 */
type _$multiply2<
  /**
   * The multiplicand.
   */
  A extends DigitList.DigitList,
  /**
   * The multiplier.
   */
  B extends DigitList.DigitList,
  /**
   * As we proceed in the traditional multiplication algorithm, there are a
   * number of zeroes that are appended to the end of the partial products.
   *
   * This type parameter represents the zeroes that are appended to the end of
   * the partial products. As we proceed in the algorithm, the number of zeroes
   * appended to the end of the partial products increases by one.
   */
  SCALE extends DigitList.DigitList = [],
  /**
   * The sum of the partial products, which we add to as we proceed through each
   * digit of the multiplicand.
   */
  SUM extends DigitList.DigitList = [],
  /**
   * The last digit of the multiplicand, which we multiply by the multiplier.
   * As we loop through the digits of the multiplicand, we pop the last digit
   * off of the multiplicand.
   */
  LAST_A extends Digit.Digit = DigitList._$last<A>,
  /**
   * The next instance of A, with the last digit popped off.
   */
  POP_A extends DigitList.DigitList = DigitList._$pop<A>,
  /**
   * The result of multiplying the last digit of the multiplicand by the
   * multiplier.
   */
  MUL extends DigitList.DigitList = DigitList._$multiplyDigit<B, LAST_A>,
  /**
   * Next, we shift the result of the current multiplication by the number of
   * zeroes equivalent to the position of the digit, counted from the right.
   */
  MUL_SCALE extends DigitList.DigitList = [...MUL, ...SCALE],
  /**
   * Finally, we add the result of the current multiplication, shifted
   * appropriately, to the sum of the partial products.
   */
  ADD extends DigitList.DigitList = DigitList._$add<SUM, MUL_SCALE>,
  /**
   * The next instance of SCALE, with one more zero appended to the end.
   */
  NEXT_SCALE extends DigitList.DigitList = [Digit.Zero, ...SCALE],
  /**
   * If A is empty, we are done, and we return the sum of the partial products.
   */
  DONE extends boolean = A extends [] ? true : false
> = DONE extends true ? SUM : _$multiply2<POP_A, B, NEXT_SCALE, ADD>

/**
 * `_$multiply` is a type-level function that multiplies a digit list by another digit list.
 * It returns the result of the multiplication operation.
 *
 * @template A - The digit list.
 * @template B - A digit list.
 *
 * @example
 * For example, we can use `_$multiply` to multiply a digit list ["4", "2"] by another digit list ["1", "2"]:
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Is504 = DigitList._$multiply<["4", "2"], ["1", "2"]>; // ["5", "0", "4"]
 * ```
 *
 * @example
 * If one of the inputs is an empty digit list or the zero digit, the result will be the zero digit.
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type IsZero = DigitList._$multiply<["4", "2"], []>; // ["0"]
 * type IsZero2 = DigitList._$multiply<["4", "2"], ["0"]>; // ["0"]
 * ```
 */
export type _$multiply<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList
> = DigitList._$trim<Type._$cast<_$multiply2<A, B>, DigitList.DigitList>>

interface Multiply_T<T extends DigitList.DigitList> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$multiply<typeof x, T>
}

/**
 * `Multiply` is a type-level function that multiplies a digit list by another digit list.
 * It returns the result of the multiplication operation.
 *
 * @template A - The digit list.
 * @template B - The single digit.
 *
 * @example
 * For example, we can use `Multiply` to multiply a digit list ["4", "2"] by another digit list ["1", "2"]:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Is504 = $<$<DigitList.Multiply, ["1", "2"]>, ["4", "2"]>; // ["5", "0", "4"]
 * ```
 *
 * @example
 * If one of the inputs is an empty digit list or the zero digit, the result will be the zero digit.
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type IsZero = $<$<DigitList.Multiply, []>, ["4", "2"]>; // ["0"]
 * type IsZero2 = $<$<DigitList.Multiply, ["0"], ["4", "2"]>; // ["0"]
 * ```
 */
export interface Multiply extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): Multiply_T<typeof x>
}
