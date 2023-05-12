import { DecimalDigitList, Digit, DigitList, Kind, Type } from "..";

export type _$compare2<
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
          ? _$compare2<A_NEXT, B_NEXT>
          : COMP
> = RESULT;

export type _$compare<
  A extends DecimalDigitList.DecimalDigitList,
  B extends DecimalDigitList.DecimalDigitList,
  RESULT extends 1 | 0 | -1 = _$compare2<DigitList._$trimRight<A>, DigitList._$trimRight<B>>
> = RESULT

interface Compare_T<X extends DecimalDigitList.DecimalDigitList> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DecimalDigitList.DecimalDigitList>): _$compare<X, typeof x>
}

export interface Compare extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DecimalDigitList.DecimalDigitList>): Compare_T<typeof x>
}
