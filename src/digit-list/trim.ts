import { Type, Kind, DigitList } from "..";

type _$trim2<A extends DigitList.DigitList> = A extends [
  infer First,
  ...infer Rest extends DigitList.DigitList
]
  ? First extends "0"
    ? _$trim2<Rest>
    : A
  : A;

export type _$trim<
  A extends DigitList.DigitList,
  TRIM extends DigitList.DigitList = _$trim2<A>,
  OUTPUT extends DigitList.DigitList = TRIM extends [] ? ["0"] : TRIM
> = OUTPUT;

export declare abstract class Trim extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], DigitList.DigitList>
  ) => _$trim<typeof x>;
}
