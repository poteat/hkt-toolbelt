import { Kind, Type, DigitList } from "..";

export type _$modulo<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList
> = DigitList._$divide<A, B, "MODULO">;

declare abstract class Modulo_T<
  T extends DigitList.DigitList
> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], DigitList.DigitList>
  ) => _$modulo<T, typeof x>;
}

export declare abstract class Modulo extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], DigitList.DigitList>
  ) => Modulo_T<typeof x>;
}
