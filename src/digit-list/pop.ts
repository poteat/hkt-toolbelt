import { Type, Kind, DigitList } from "..";

export type _$pop<T extends DigitList.DigitList> = T extends []
  ? []
  : T extends [...infer X, unknown]
  ? X
  : [];

export interface Pop extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$pop<typeof x>;
}
