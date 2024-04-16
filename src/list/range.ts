import { $, Kind, Type, Number, List, Conditional, DigitList, Digit, Integer, NaturalNumber } from '..'

type _$range2<
  START extends DigitList.DigitList,
  STOP extends DigitList.DigitList,
  STEP extends DigitList.DigitList,
  STEP_SIGN extends "+" | "-",
  COUNTER extends DigitList.DigitList = START,
  LIST extends Number.Number[] = [DigitList._$toNumber<START>],
  /**
   * Whether the current counter value is larger, equal to, or smaller
   * than the intended stop value.
   */
  COMPARE extends 1 | 0 | -1 = DigitList._$compare<COUNTER, STOP>,
  NEW_COUNTER extends DigitList.DigitList = 
    STEP_SIGN extends "+"
      ? DigitList._$add<COUNTER, STEP>
      : DigitList._$subtract<COUNTER, STEP>,
  NEW_LIST extends Number.Number[] =
    [...LIST, DigitList._$toNumber<NEW_COUNTER>],
  /**
   * Whether we are done iterating; we basically calculate whether we
   * should expect the counter to be larger or smaller than the stop
   * value, per the sign of the step value.
   */
  IS_DONE = STEP_SIGN extends "+"
    ? COMPARE extends 1 | 0
      ? true
      : false
    : COMPARE extends -1 | 0
      ? true
      : false,
  RESULT = List._$pop<LIST>
> = 0 extends 1 ? never : IS_DONE extends true
  ? RESULT
  : _$range2<START, STOP, STEP, STEP_SIGN, NEW_COUNTER, NEW_LIST>

/**
 * `_$range` is a type-level function that generates a range of numbers.
 *
 * @template START - The start of the range.
 * @template STOP - The end of the range.
 * @template STEP - The step size for the range.
 * @returns A list of integer types.
 *
 * @example
 * type T0 = List._$range<0, 10, 1> // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * type T1 = List._$range<10, 0, -2> // [10, 8, 6, 4, 2]
 */
export type _$range<
  START extends Number.Number,
  STOP extends Number.Number,
  STEP extends Number.Number
> =
  List._$every<
    $<Conditional.Extends, true>,
    [
      Number._$isNatural<START>,
      Number._$isNatural<STOP>,
      Number._$isInteger<STEP>
    ]
  > extends true
    ? _$range2<
        DigitList._$fromString<Number._$toString<START>>,
        DigitList._$fromString<Number._$toString<STOP>>,
        DigitList._$fromString<Number._$toString<Number._$absolute<STEP>>>,
        Number._$sign<STEP>
      >
    : never

interface Range_T2<START extends Number.Number, STOP extends Number.Number>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$range<START, STOP, typeof x>
}

interface Range_T<START extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Range_T2<START, typeof x>
}

/**
 * `Range` is a type-level function that generates a range of numbers.
 *
 * @template START - The start of the range.
 * @template STOP - The end of the range.
 * @template STEP - The step size for the range.
 * @returns A list of integer types.
 *
 * @example
 * type T0 = $<$<$<List.Range, 0>, 10>, 1> // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * type T1 = $<$<$<List.Range, 10>, 0>, -2> // [10, 8, 6, 4, 2]
 */
export interface Range extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Range_T<typeof x>
}
