import { Type, Kind, Digit, DigitList } from "..";

export type _$last<T extends DigitList.DigitList> = T extends []
  ? Digit.Zero
  : T extends [...unknown[], infer X]
  ? X
  : Digit.Zero;

export interface Last extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$last<typeof x>;
}
