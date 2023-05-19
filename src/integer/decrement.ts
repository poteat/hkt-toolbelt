import { Type, Kind, DigitList, NaturalNumber, Number } from "..";

export type _$decrement<
  A extends Number.Number,
  A_SGN extends "+" | "-" = Number._$sign<A>,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<Number._$absolute<A>>,
  DECREMENT extends DigitList.DigitList =
    A_SGN extends "+"
        ? DigitList._$decrement<A_LIST>
        : DigitList._$increment<A_LIST>,
  RESULT extends Number.Number = A_SGN extends "-" 
    ? Number._$fromString<
        `-${DigitList._$toString<DECREMENT>}`
      >
    : Number._$fromString<DigitList._$toString<DECREMENT>>
> = RESULT;

export interface Decrement extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? _$decrement<typeof x> : never;
}
