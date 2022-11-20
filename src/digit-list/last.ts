import { Type, Kind, Digit, DigitList } from "..";

export type _$last<T extends DigitList.DigitList> = T extends []
  ? Digit.Zero
  : T extends [...unknown[], infer X]
  ? X
  : Digit.Zero;

export declare abstract class Last extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], DigitList.DigitList>
  ) => _$last<typeof x>;
}
