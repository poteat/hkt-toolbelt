import { Type, Number, Kind, DigitList, NaturalNumber } from "..";

export type _$add<
  A extends Number.Number,
  B extends Number.Number,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<A>,
  B_LIST extends DigitList.DigitList = NaturalNumber._$toList<B>,
  SUM_LIST extends DigitList.DigitList = DigitList._$add<A_LIST, B_LIST>,
  SUM = Number._$fromString<DigitList._$toString<SUM_LIST>>
> = SUM;

declare abstract class Add_T<A extends Number.Number> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Number.Number>
  ) => Number._$isNatural<typeof x> extends true ? _$add<A, typeof x> : never;
}

export declare abstract class Add extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Number.Number>
  ) => Number._$isNatural<typeof x> extends true ? Add_T<typeof x> : never;
}
