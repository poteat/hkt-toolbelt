import { Kind, Type } from "hkt-toolbelt";
import { DigitList, Digit } from '..';

export type _$fromString2<
  T extends string, 
  M extends DigitList.DigitList = []
> = T extends `${infer D extends Digit.Digit}${infer Rest}`
  ? _$fromString2<Rest, [...M, D]>
  : M

export type _$fromString<T extends string> = DigitList._$trim<_$fromString2<T>>;

export interface FromString extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$fromString<typeof x>;
}
