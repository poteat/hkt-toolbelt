import { Type, Kind, Digit, DigitList } from '..'

type _$decrement2<
  A extends DigitList.DigitList,
  CARRY extends Digit.Digit = '1',
  OUTPUT extends DigitList.DigitList = [],
  A_LAST extends Digit.Digit = DigitList._$last<A>,
  A_POP extends DigitList.DigitList = DigitList._$pop<A>,
  NEXT_A extends DigitList.DigitList = A_POP extends '0'[] ? [] : A_POP,
  DECREMENT extends Digit.Digit = CARRY extends '1'
    ? Digit._$decrement<A_LAST>
    : A_LAST,
  NEXT_CARRY extends Digit.Digit = CARRY extends '1'
    ? Digit._$decrementTens<A_LAST>
    : '0',
  NEXT_OUTPUT extends DigitList.DigitList = [DECREMENT, ...OUTPUT],
  FINAL_RESULT = CARRY extends '1' ? ['0'] : OUTPUT,
  SHORT_CIRCUIT = A extends '0'[] ? OUTPUT : [...A, ...OUTPUT]
> = 0 extends 1
  ? never
  : A extends '0'[]
  ? FINAL_RESULT
  : CARRY extends '0'
  ? SHORT_CIRCUIT
  : _$decrement2<NEXT_A, NEXT_CARRY, NEXT_OUTPUT>

/**
 * `_$decrement` is a type-level function that takes in a digit list `A` and
 * returns a new digit list representing the result of decrementing the input
 * digit list by 1. If the input digit list is empty or represents zero, the
 * result will be a digit list representing zero.
 *
 * ## Parameters
 *
 * @param A A digit list type.
 *
 * ## Example
 *
 * @example
 *
 * For example, we can use `_$decrement` to decrement a digit list representing
 * the number 42 by 1. In this example, the digit list `["4", "2"]` is passed as
 * a type argument to the type-level function:
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Result = DigitList._$decrement<["4", "2"]>; // ["4", "1"]
 * ```
 *
 * @example
 *
 * We can also use `_$decrement` with an empty digit list or a digit list
 * representing zero. In both cases, the result will be a digit list
 * representing zero:
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Result1 = DigitList._$decrement<[]>; // ["0"]
 * type Result2 = DigitList._$decrement<["0"]>; // ["0"]
 * ```
 */
export type _$decrement<A extends DigitList.DigitList> = DigitList._$trim<
  A extends '0'[] ? ['0'] : _$decrement2<A>
>

/**
 * `Decrement` is a type-level function that takes in a digit list `A` and
 * returns a new digit list representing the result of decrementing the input
 * digit list by 1. If the input digit list is empty or represents zero, the
 * result will be a digit list representing zero.
 *
 * ## Parameters
 *
 * @param A A digit list type.
 *
 * ## Example
 *
 * @example
 *
 * For example, we can use `Decrement` to decrement a digit list representing
 * the number 42 by 1. In this example, the digit list `["4", "2"]` is passed as
 * a type argument to the type-level function:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Result = $<DigitList.Decrement, ["4", "2"]>; // ["4", "1"]
 * ```
 *
 * @example
 *
 * We can also use `Decrement` with an empty digit list or a digit list
 * representing zero. In both cases, the result will be a digit list
 * representing zero:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Result1 = $<DigitList.Decrement, []>; // ["0"]
 * type Result2 = $<DigitList.Decrement, ["0"]>; // ["0"]
 * ```
 */
export interface Decrement extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$decrement<typeof x>
}
