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

declare abstract class SubtractTens_T<A extends Digit.Digit> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Digit.Digit>
  ) => _$subtractTens<A, typeof x>;
}

export declare abstract class SubtractTens extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Digit.Digit>
  ) => SubtractTens_T<typeof x>;
}
