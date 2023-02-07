import { Type, Digit, Kind } from "..";

type _$subtract_LUT = [
  ["0", "9", "8", "7", "6", "5", "4", "3", "2", "1"],
  ["1", "0", "9", "8", "7", "6", "5", "4", "3", "2"],
  ["2", "1", "0", "9", "8", "7", "6", "5", "4", "3"],
  ["3", "2", "1", "0", "9", "8", "7", "6", "5", "4"],
  ["4", "3", "2", "1", "0", "9", "8", "7", "6", "5"],
  ["5", "4", "3", "2", "1", "0", "9", "8", "7", "6"],
  ["6", "5", "4", "3", "2", "1", "0", "9", "8", "7"],
  ["7", "6", "5", "4", "3", "2", "1", "0", "9", "8"],
  ["8", "7", "6", "5", "4", "3", "2", "1", "0", "9"],
  ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0"]
];

export type _$subtract<
  A extends Digit.Digit,
  B extends Digit.Digit
> = _$subtract_LUT[A][B];

interface Subtract_T<A extends Digit.Digit> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): _$subtract<A, typeof x>;
}

export interface Subtract extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): Subtract_T<typeof x>;
}
