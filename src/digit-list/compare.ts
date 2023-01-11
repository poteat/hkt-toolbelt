import { Boolean, Digit, DigitList, Kind, NaturalNumber, Type } from '../'

type _$compare2<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList,
  A_LENGTH extends DigitList.DigitList = NaturalNumber._$toList<A["length"]>,
  B_LENGTH extends DigitList.DigitList = NaturalNumber._$toList<B["length"]>,
  IS_SAME_LENGTH extends boolean = A_LENGTH extends B_LENGTH ? true : false,
  BOTH_SINGLE_DIGIT extends boolean = Boolean._$and<A_LENGTH extends ["1"] ? true : false, B_LENGTH extends ["1"] ? true : false>,
  A_FIRST extends Digit.Digit = DigitList._$first<A>,
  B_FIRST extends Digit.Digit = DigitList._$first<B>,
  A_NEXT extends DigitList.DigitList = DigitList._$shift<A>,
  B_NEXT extends DigitList.DigitList = DigitList._$shift<B>,
  COMP = Digit._$compare<A_FIRST, B_FIRST>,
  RESULT = IS_SAME_LENGTH extends false
    ? _$compare2<A_LENGTH, B_LENGTH>
    : A extends []
      ? B extends [] ? 0 : -1
      : B extends [] ? 1 : BOTH_SINGLE_DIGIT extends true
        ? Digit._$compare<A_FIRST, B_FIRST>
        : COMP extends 0
          ? _$compare2<A_NEXT, B_NEXT>
          : COMP
> = RESULT;

export type _$compare<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList,
  RESULT = _$compare2<A, B>
> = RESULT;

declare abstract class Compare_T<X extends DigitList.DigitList> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], DigitList.DigitList>
  ) => _$compare<X, typeof x>;
}

export declare abstract class Compare extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], DigitList.DigitList>
  ) => Compare_T<typeof x>;
}
