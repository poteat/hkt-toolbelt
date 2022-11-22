import { Type, Kind, DigitList } from "..";

type _$toString2<
  T extends DigitList.DigitList,
  O extends string = ""
> = T extends []
  ? O
  : _$toString2<DigitList._$pop<T>, `${DigitList._$last<T>}${O}`>;

export type _$toString<
  T extends DigitList.DigitList,
  JOIN = _$toString2<T>,
  RESULT = JOIN extends "" ? "0" : JOIN
> = RESULT;

export declare abstract class ToString extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], DigitList.DigitList>
  ) => _$toString<typeof x>;
}
