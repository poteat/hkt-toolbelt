import { Number, NaturalNumber, DigitList, Type, Kind } from "..";

export type _$subtract<
A extends Number.Number,
B extends Number.Number,
A_SGN extends "+" | "-" = Number._$sign<A>,
B_SGN extends "+" | "-" = Number._$sign<B>,
A_LIST extends DigitList.DigitList = NaturalNumber._$toList<Number._$absolute<A>>,
B_LIST extends DigitList.DigitList = NaturalNumber._$toList<Number._$absolute<B>>,
IS_A_GREATER extends 1 | 0 | -1 = DigitList._$compare<A_LIST, B_LIST>,
DIFF = 
  A_SGN extends "+"
    ? B_SGN extends "+"
      ? IS_A_GREATER extends 0
        ? 0
        : IS_A_GREATER extends 1
          ? DigitList._$toNumber<DigitList._$subtract<A_LIST, B_LIST>>
          : Number._$fromString<`-${DigitList._$toNumber<DigitList._$subtract<B_LIST, A_LIST>>}`>
      : DigitList._$toNumber<DigitList._$add<A_LIST, B_LIST>>
    : B_SGN extends "+"
      ? Number._$fromString<`-${DigitList._$toNumber<DigitList._$add<A_LIST, B_LIST>>}`>
      : IS_A_GREATER extends 0
        ? 0
        : IS_A_GREATER extends 1
          ? Number._$fromString<`-${DigitList._$toNumber<DigitList._$subtract<A_LIST, B_LIST>>}`>
          : DigitList._$toNumber<DigitList._$subtract<B_LIST, A_LIST>>
> = DIFF;

interface Subtract_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? _$subtract<A, typeof x> : never;
}

export interface Subtract extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? Subtract_T<typeof x> : never;
}
