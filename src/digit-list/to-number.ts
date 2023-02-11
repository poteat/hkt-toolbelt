import { DigitList, Kind, Number, Type } from "..";

export type _$toNumber<
  T extends DigitList.DigitList,
  RESULT extends Number.Number = T extends [] ? never : Number._$fromString<DigitList._$toString<T>>
> = RESULT;

export interface ToNumber extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$toNumber<typeof x>;
}
