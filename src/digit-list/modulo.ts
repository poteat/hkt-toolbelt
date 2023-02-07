import { Kind, Type, DigitList } from "..";

export type _$modulo<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList
> = DigitList._$divide<A, B, "MODULO">;

interface Modulo_T<T extends DigitList.DigitList> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$modulo<T, typeof x>;
}

export interface Modulo extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): Modulo_T<typeof x>;
}
