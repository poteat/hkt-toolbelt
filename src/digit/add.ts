import { Type, Digit, Kind } from "..";

type _$add_LUT = [
  ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["2", "3", "4", "5", "6", "7", "8", "9", "0", "1"],
  ["3", "4", "5", "6", "7", "8", "9", "0", "1", "2"],
  ["4", "5", "6", "7", "8", "9", "0", "1", "2", "3"],
  ["5", "6", "7", "8", "9", "0", "1", "2", "3", "4"],
  ["6", "7", "8", "9", "0", "1", "2", "3", "4", "5"],
  ["7", "8", "9", "0", "1", "2", "3", "4", "5", "6"],
  ["8", "9", "0", "1", "2", "3", "4", "5", "6", "7"],
  ["9", "0", "1", "2", "3", "4", "5", "6", "7", "8"]
];

export type _$add<
  A extends Digit.Digit,
  B extends Digit.Digit
> = _$add_LUT[A][B];

declare abstract class Add_T<A extends Digit.Digit> extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], Digit.Digit>) => _$add<A, typeof x>;
}

export declare abstract class Add extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], Digit.Digit>) => Add_T<typeof x>;
}
