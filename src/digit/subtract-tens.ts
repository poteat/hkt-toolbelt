import { Type, Digit, Kind } from "..";

type _$subtractTens_LUT = [
  ["0", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
  ["0", "0", "1", "1", "1", "1", "1", "1", "1", "1"],
  ["0", "0", "0", "1", "1", "1", "1", "1", "1", "1"],
  ["0", "0", "0", "0", "1", "1", "1", "1", "1", "1"],
  ["0", "0", "0", "0", "0", "1", "1", "1", "1", "1"],
  ["0", "0", "0", "0", "0", "0", "1", "1", "1", "1"],
  ["0", "0", "0", "0", "0", "0", "0", "1", "1", "1"],
  ["0", "0", "0", "0", "0", "0", "0", "0", "1", "1"],
  ["0", "0", "0", "0", "0", "0", "0", "0", "0", "1"],
  ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
];

export type _$subtractTens<
  A extends Digit.Digit,
  B extends Digit.Digit
> = _$subtractTens_LUT[A][B];

interface SubtractTens_T<A extends Digit.Digit> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): _$subtractTens<A, typeof x>;
}

export interface SubtractTens extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): SubtractTens_T<typeof x>;
}
