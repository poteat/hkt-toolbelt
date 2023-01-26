import { Type, Number, Kind, DigitList, NaturalNumber } from "..";

export type _$compare<
  A extends Number.Number,
  B extends Number.Number,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<A>,
  B_LIST extends DigitList.DigitList = NaturalNumber._$toList<B>,
  RESULT extends -1 | 0 | 1 = DigitList._$compare<A_LIST, B_LIST>,
> = RESULT;

declare abstract class Compare_T<A extends Number.Number> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Number.Number>
  ) => Number._$isNatural<typeof x> extends true
    ? _$compare<A, typeof x>
    : never;
}

export declare abstract class Compare extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Number.Number>
  ) => Number._$isNatural<typeof x> extends true ? Compare_T<typeof x> : never;
}
