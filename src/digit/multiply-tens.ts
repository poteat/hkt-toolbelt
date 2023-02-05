import { Type, Kind, Digit } from "..";

type _$multiplyTens_LUT = [
  ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0", "1", "1", "1", "1", "1"],
  ["0", "0", "0", "0", "1", "1", "1", "2", "2", "2"],
  ["0", "0", "0", "1", "1", "2", "2", "2", "3", "3"],
  ["0", "0", "1", "1", "2", "2", "3", "3", "4", "4"],
  ["0", "0", "1", "1", "2", "3", "3", "4", "4", "5"],
  ["0", "0", "1", "2", "2", "3", "4", "4", "5", "6"],
  ["0", "0", "1", "2", "3", "4", "4", "5", "6", "7"],
  ["0", "0", "1", "2", "3", "4", "5", "6", "7", "8"]
];

export type _$multiplyTens<
  A extends Digit.Digit,
  B extends Digit.Digit
> = _$multiplyTens_LUT[A][B];

interface MultiplyTens_T<A extends Digit.Digit> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): _$multiplyTens<A, typeof x>;
}

export interface MultiplyTens extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): MultiplyTens_T<typeof x>;
}
