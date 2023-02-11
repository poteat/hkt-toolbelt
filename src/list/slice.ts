import { NaturalNumber, Number, DigitList, Digit, Kind, Type, List } from "..";

type _$slice2<
  T extends unknown[], 
  START extends Number.Number,
  END extends Number.Number,
  T_LENGTH extends DigitList.DigitList = NaturalNumber._$toList<T["length"]>,
  START_ABS extends DigitList.DigitList = NaturalNumber._$toList<Number._$absolute<START>>,
  END_ABS extends DigitList.DigitList = NaturalNumber._$toList<Number._$absolute<END>>,
  SHIFT_NORM extends DigitList.DigitList = Number._$isNatural<START> extends true
    ? START_ABS
    : DigitList._$compare<T_LENGTH, START_ABS> extends -1
      ? [Digit.Zero]
      : DigitList._$subtract<T_LENGTH, START_ABS>,
  POP_NORM extends DigitList.DigitList = Number._$isNatural<END> extends true
    ? DigitList._$compare<T_LENGTH, END_ABS> extends -1
      ? [Digit.Zero]
      : DigitList._$subtract<T_LENGTH, END_ABS>
    : END_ABS,
  SHIFT_COUNT extends Number.Number = Number._$fromString<DigitList._$toString<SHIFT_NORM>>,
  POP_COUNT extends Number.Number = Number._$fromString<DigitList._$toString<POP_NORM>>,
  RESULT extends List.List = List._$shiftN<List._$popN<T, POP_COUNT>, SHIFT_COUNT>,
> = RESULT;

export type _$slice<
  T extends unknown[],
  RANGE extends [Number.Number, Number.Number],
  RESULT extends List.List = RANGE["length"] extends 2
    ? List._$every<Number.IsInteger, RANGE> extends true
      ? _$slice2<T, RANGE[0], RANGE[1]>
      : never
    : never
> = RESULT;

interface Slice_T<N extends [Number.Number, Number.Number]> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$slice<typeof x, N>;
}

export interface Slice extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], [Number.Number, Number.Number]>): Slice_T<typeof x>;
}
