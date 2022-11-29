import { Type, Kind, Digit, DigitList } from "..";

export type _$isOdd<
  T extends DigitList.DigitList,
  LAST extends Digit.Digit = DigitList._$last<T>
> = LAST extends "1" | "3" | "5" | "7" | "9" ? true : false;

export declare abstract class IsOdd extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], DigitList.DigitList>
  ) => _$isOdd<typeof x>;
}
