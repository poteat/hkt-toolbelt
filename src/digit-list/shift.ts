import { Type, Kind, DigitList } from "..";

export type _$shift<T extends DigitList.DigitList> = T extends []
  ? []
  : T extends [unknown, ...infer X]
  ? X
  : [];

export interface Shift extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$shift<typeof x>;
}
