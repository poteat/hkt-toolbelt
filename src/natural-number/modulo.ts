import { Type, Number, Kind, DigitList, NaturalNumber } from "..";

export type _$modulo<
  A extends Number.Number,
  B extends Number.Number,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<A>,
  B_LIST extends DigitList.DigitList = NaturalNumber._$toList<B>,
  MODULUS_LIST extends DigitList.DigitList = DigitList._$modulo<A_LIST, B_LIST>,
  MODULUS = Number._$fromString<DigitList._$toString<MODULUS_LIST>>
> = MODULUS;

declare abstract class Modulo_T<A extends Number.Number> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Number.Number>
  ) => Number._$isNatural<typeof x> extends true
    ? _$modulo<A, typeof x>
    : never;
}

export declare abstract class Modulo extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Number.Number>
  ) => Number._$isNatural<typeof x> extends true ? Modulo_T<typeof x> : never;
}
