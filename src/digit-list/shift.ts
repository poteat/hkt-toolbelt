import { Type, Kind, DigitList } from "..";

export type _$shift<T extends DigitList.DigitList> = T extends []
  ? []
  : T extends [unknown, ...infer X]
  ? X
  : [];

export declare abstract class Shift extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], DigitList.DigitList>
  ) => _$shift<typeof x>;
}
