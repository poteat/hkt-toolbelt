import { Type, Digit, Kind } from "..";

type _$decrementTens_LUT = ["1", "0", "0", "0", "0", "0", "0", "0", "0", "0"];

export type _$decrementTens<A extends Digit.Digit> = _$decrementTens_LUT[A];

export declare abstract class DecrementTens extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Digit.Digit>
  ) => _$decrementTens<typeof x>;
}
