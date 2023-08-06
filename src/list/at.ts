import {
  $,
  Digit,
  DigitList,
  Kind,
  Type,
  Number,
  List,
  NaturalNumber,
  Boolean
} from "../";

export type _$at<
  T extends List.List,
  POS extends Number.Number,
  T_LENGTH extends DigitList.DigitList = NaturalNumber._$toList<T["length"]>,
  POS_ABS extends DigitList.DigitList = NaturalNumber._$toList<
    Number._$absolute<POS>
  >,
  POS_NORM extends DigitList.DigitList = Number._$isNatural<POS> extends true
    ? DigitList._$compare<POS_ABS, T_LENGTH> extends -1
      ? POS_ABS
      : never
    : DigitList._$compare<T_LENGTH, POS_ABS> extends -1
    ? never
    : DigitList._$subtract<T_LENGTH, POS_ABS>,
  INDEX extends number = DigitList._$toNumber<POS_NORM>
> = POS_NORM extends never ? never : T[INDEX];

interface At_T<X extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], unknown[]>
  ): Number._$isInteger<X> extends true ? _$at<typeof x, X> : never;
}

export interface At extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): At_T<typeof x>;
}
