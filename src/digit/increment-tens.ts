import { Type, Digit, Kind } from "..";

type _$incrementTens_LUT = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "1"];

export type _$incrementTens<A extends Digit.Digit> = _$incrementTens_LUT[A];

export declare abstract class IncrementTens extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Digit.Digit>
  ) => _$incrementTens<typeof x>;
}
