import { Type, Digit, Kind } from "..";

type _$increment_LUT = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export type _$increment<A extends Digit.Digit> = _$increment_LUT[A];

export declare abstract class Increment extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Digit.Digit>
  ) => _$increment<typeof x>;
}
