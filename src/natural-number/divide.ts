import { Type, Number, Kind, DigitList, NaturalNumber } from "..";

export type _$divide<
  A extends Number.Number,
  B extends Number.Number,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<A>,
  B_LIST extends DigitList.DigitList = NaturalNumber._$toList<B>,
  QUOTIENT_LIST extends DigitList.DigitList = DigitList._$divide<
    A_LIST,
    B_LIST
  >,
  QUOTIENT = Number._$fromString<DigitList._$toString<QUOTIENT_LIST>>
> = QUOTIENT;

interface Divide_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? _$divide<A, typeof x> : never;
}

export interface Divide extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? Divide_T<typeof x> : never;
}
