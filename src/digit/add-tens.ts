import { Type, Digit, Kind } from "..";

type _$addTens_LUT = [
  ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0", "0", "0", "0", "0", "1"],
  ["0", "0", "0", "0", "0", "0", "0", "0", "1", "1"],
  ["0", "0", "0", "0", "0", "0", "0", "1", "1", "1"],
  ["0", "0", "0", "0", "0", "0", "1", "1", "1", "1"],
  ["0", "0", "0", "0", "0", "1", "1", "1", "1", "1"],
  ["0", "0", "0", "0", "1", "1", "1", "1", "1", "1"],
  ["0", "0", "0", "1", "1", "1", "1", "1", "1", "1"],
  ["0", "0", "1", "1", "1", "1", "1", "1", "1", "1"],
  ["0", "1", "1", "1", "1", "1", "1", "1", "1", "1"]
];

export type _$addTens<
  A extends Digit.Digit,
  B extends Digit.Digit
> = _$addTens_LUT[A][B];

export interface AddTens_T<A extends Digit.Digit> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): _$addTens<A, typeof x>;
}

export interface AddTens extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): AddTens_T<typeof x>;
}
