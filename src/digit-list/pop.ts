import { Type, Kind, DigitList } from "..";

export type _$pop<T extends DigitList.DigitList> = T extends []
  ? []
  : T extends [...infer X, unknown]
  ? X
  : [];

export declare abstract class Pop extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], DigitList.DigitList>
  ) => _$pop<typeof x>;
}
