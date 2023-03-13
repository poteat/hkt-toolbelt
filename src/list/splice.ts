import { NaturalNumber, Number, DigitList, Digit, Kind, Type, List, Boolean } from "..";

type _$splice2<
  T extends unknown[], 
  START extends Number.Number,
  DEL_COUNT extends DigitList.DigitList,
  INSERTS extends unknown[],
  PRE extends unknown[] = [],
  POST extends unknown[] = T,
  T_LENGTH extends DigitList.DigitList = NaturalNumber._$toList<T["length"]>,
  START_ABS extends DigitList.DigitList = NaturalNumber._$toList<Number._$absolute<START>>,
  START_NORM extends DigitList.DigitList = Number._$isNatural<START> extends true
    ? START_ABS
    : DigitList._$compare<T_LENGTH, START_ABS> extends -1
      ? [Digit.Zero]
      : DigitList._$subtract<T_LENGTH, START_ABS>,
  RESULT extends List.List = DigitList._$compare<START_NORM, NaturalNumber._$toList<T["length"]>> extends 1 | 0
    ? List._$concat<INSERTS, T>
    : DEL_COUNT extends [Digit.Zero]
      ? START_NORM extends [Digit.Zero]
        ? [...PRE, ...INSERTS, ...POST]
        : _$splice2<T, DigitList._$toNumber<DigitList._$decrement<START_NORM>>, [Digit.Zero], INSERTS, List._$push<POST[0], PRE>, List._$shift<POST>>
      : START_NORM extends [Digit.Zero]
        ? [...PRE, ...INSERTS, ...List._$shiftN<POST, DigitList._$toNumber<DEL_COUNT>>]
        : _$splice2<T, DigitList._$toNumber<DigitList._$decrement<START_NORM>>, DEL_COUNT, INSERTS, List._$push<POST[0], PRE>, List._$shift<POST>>
> = RESULT;

export type _$splice<
  T extends unknown[],
  START extends Number.Number,
  DEL_COUNT extends Number.Number,
  INSERTS extends unknown[],
  RESULT extends List.List = Boolean._$and<Number._$isInteger<START>, Number._$isNatural<DEL_COUNT>> extends true
    ? _$splice2<T, START, NaturalNumber._$toList<DEL_COUNT>, INSERTS>
    : never
> = RESULT;

interface Splice_T2<INPUT extends [START: Number.Number, DEL_COUNT: Number.Number], INSERTS extends unknown[]> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$splice<typeof x, INPUT[0], INPUT[1], INSERTS>;
}

interface Splice_T<INPUT extends [START: Number.Number, DEL_COUNT: Number.Number]> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): Splice_T2<INPUT, typeof x>;
}

export interface Splice extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], [START: Number.Number, DEL_COUNT: Number.Number]>): Splice_T<typeof x>;
}
