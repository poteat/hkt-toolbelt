import { Type, Number, Kind, Digit, DigitList, NaturalNumber, Conditional, Boolean, List, $ } from "..";

export type _$compare2<
  A extends Number.Number,
  B extends Number.Number,
  A_SGN extends "+" | "-" = Number._$sign<A>,
  B_SGN extends "+" | "-" = Number._$sign<B>,
  A_ABS extends Number.Number = Number._$absolute<A>,
  B_ABS extends Number.Number = Number._$absolute<B>,
  A_INT extends DigitList.DigitList = `${A_ABS}` extends `${infer INT extends Number.Number}.${string}` 
    ? NaturalNumber._$toList<INT>
    : NaturalNumber._$toList<A_ABS>,
  B_INT extends DigitList.DigitList = `${B_ABS}` extends `${infer INT extends Number.Number}.${string}` 
    ? NaturalNumber._$toList<INT>
    : NaturalNumber._$toList<B_ABS>,
  A_DEC extends DigitList.DigitList = `${A}` extends `${string}.${infer DEC extends string}` 
    ? DigitList._$fromString2<DEC>
    : [],
  B_DEC extends DigitList.DigitList = `${B}` extends `${string}.${infer DEC extends string}` 
    ? DigitList._$fromString2<DEC>
    : [],
  RESULT extends 1 | 0 | -1 = 
    A_SGN extends "+"
      ? B_SGN extends "+"
        ? A_INT extends B_INT
          ? _$decimalCompare<A_DEC, B_DEC>
          : DigitList._$compare<A_INT, B_INT>
        : 1
      : B_SGN extends "+"
        ? -1
        : A_INT extends B_INT
          ? _$decimalCompare<B_DEC, A_DEC>
          : DigitList._$compare<B_INT, A_INT>
> = RESULT;

export type _$decimalCompare<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList,
  A_FIRST extends Digit.Digit = DigitList._$first<A>,
  B_FIRST extends Digit.Digit = DigitList._$first<B>,
  A_NEXT extends DigitList.DigitList = DigitList._$shift<A>,
  B_NEXT extends DigitList.DigitList = DigitList._$shift<B>,
  COMP extends 1 | 0 | -1 = Digit._$compare<A_FIRST, B_FIRST>,
  RESULT extends 1 | 0 | -1 = 
    A extends []
      ? B extends []
        ? 0
        : -1
      : B extends []
        ? 1
        : COMP extends 0
          ? _$decimalCompare<A_NEXT, B_NEXT>
          : COMP
> = RESULT;

export type _$compare<
  A extends Number.Number,
  B extends Number.Number,
  RESULT extends 1 | 0 | -1 = _$compare2<A, B>
> = RESULT;

interface Compare_T<X extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$compare<X, typeof x>;
}

export interface Compare extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Compare_T<typeof x>;
}
