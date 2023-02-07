import { Type, Digit, Kind } from "..";

type _$decrement_LUT = ["9", "0", "1", "2", "3", "4", "5", "6", "7", "8"];

export type _$decrement<A extends Digit.Digit> = _$decrement_LUT[A];

export interface Decrement extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): _$decrement<typeof x>;
}
