import { Type, Kind, DigitList, NaturalNumber, Number } from "..";

export type _$increment<
  A extends Number.Number,
  A_SGN extends "+" | "-" = Number._$sign<A>,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<Number._$absolute<A>>,
  INCREMENT extends DigitList.DigitList = 
    A_SGN extends "+"
      ? DigitList._$increment<A_LIST>
      : DigitList._$decrement<A_LIST>,
  RESULT extends Number.Number = A_SGN extends "-" 
    ? Number._$fromString<
        `-${DigitList._$toString<INCREMENT>}`
      >
    : Number._$fromString<DigitList._$toString<INCREMENT>>
> = RESULT;

export interface Increment extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>):
    | (Number._$isInteger<typeof x> extends true ? _$increment<typeof x> : never);
}
