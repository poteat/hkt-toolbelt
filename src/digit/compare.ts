import { $, Digit, DigitList, Kind, Type } from '../'

type _$compare_LUT = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

type _$compare2<
  A extends Digit.Digit,
  B extends Digit.Digit,
  PREV extends DigitList.DigitList = _$compare_LUT,
  CURR extends Digit.Digit = DigitList._$first<PREV>,
  IS_A extends boolean = A extends CURR ? true : false,
  IS_B extends boolean = B extends CURR ? true : false,
  NEXT extends DigitList.DigitList = DigitList._$shift<PREV>,
  RESULT = IS_A extends true
    ? IS_B extends true ? 0 : -1
    : IS_B extends true ? 1 : _$compare2<A, B, NEXT>
> = RESULT;

export type _$compare<
  A extends Digit.Digit,
  B extends Digit.Digit,
  RESULT = _$compare2<A, B>
> = RESULT

declare abstract class Compare_T<A extends Digit.Digit> extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], Digit.Digit>) => _$compare<A, typeof x>;
}
  
export declare abstract class Compare extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], Digit.Digit>) => Compare_T<typeof x>;
}
