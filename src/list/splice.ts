import { NaturalNumber, Number, DigitList, Digit, Kind, Type, List } from "..";

type _$splice2<
  T extends unknown[], 
  START extends DigitList.DigitList,
  DEL_COUNT extends DigitList.DigitList,
  INSERTS extends unknown[],
  PRE extends unknown[] = [],
  POST extends unknown[] = T,
  RESULT extends List.List = DigitList._$compare<START, NaturalNumber._$toList<T["length"]>> extends 1 | 0
    ? List._$concat<INSERTS, T>
    : DEL_COUNT extends [Digit.Zero]
      ? START extends [Digit.Zero]
        ? [...PRE, ...INSERTS, ...POST]
        : _$splice2<T, DigitList._$decrement<START>, [Digit.Zero], INSERTS, List._$push<POST[0], PRE>, List._$shift<POST>>
      : START extends [Digit.Zero]
        ? [...PRE, ...INSERTS, ...List._$shiftN<POST, DigitList._$toNumber<DEL_COUNT>>]
        : _$splice2<T, DigitList._$decrement<START>, DEL_COUNT, INSERTS, List._$push<POST[0], PRE>, List._$shift<POST>>
> = RESULT;

export type _$splice<
  T extends unknown[],
  START extends Number.Number,
  DEL_COUNT extends Number.Number,
  INSERTS extends unknown[],
  RESULT extends List.List = List._$every<Number.IsNatural, [START, DEL_COUNT]> extends true
    ? _$splice2<T, NaturalNumber._$toList<START>, NaturalNumber._$toList<DEL_COUNT>, INSERTS>
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
