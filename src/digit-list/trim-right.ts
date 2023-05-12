import { Type, Kind, DigitList } from "..";

type _$trimRight2<A extends DigitList.DigitList> = A extends [
  ...infer Rest extends DigitList.DigitList,
   "0"
]
  ? _$trimRight2<Rest>
  : A;

export type _$trimRight<
  A extends DigitList.DigitList,
  TRIM extends DigitList.DigitList = _$trimRight2<A>,
  OUTPUT extends DigitList.DigitList = TRIM extends [] ? ["0"] : TRIM
> = OUTPUT;

export interface TrimRight extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$trimRight<typeof x>;
}
