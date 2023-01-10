import { Digit, DigitList, Kind, Type } from '../'

export type _$first<T extends DigitList.DigitList> = T extends []
  ? Digit.Zero
  : T extends [infer X, ...unknown[]]
  ? X
  : Digit.Zero;

export declare abstract class First extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], DigitList.DigitList>
  ) => _$first<typeof x>;
}
