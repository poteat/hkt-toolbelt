import { Kind, Type, Boolean, Number, NaturalNumber, DigitList } from '..'

export type _$modulo<
  A extends Number.Number,
  B extends Number.Number,
  A_SGN extends '+' | '-' = Number._$sign<A>,
  B_SGN extends '+' | '-' = Number._$sign<B>,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<
    Number._$absolute<A>
  >,
  B_LIST extends DigitList.DigitList = NaturalNumber._$toList<
    Number._$absolute<B>
  >,
  MODULUS_LIST extends DigitList.DigitList = DigitList._$modulo<A_LIST, B_LIST>
> = Boolean._$xnor<
  A_SGN extends '+' ? true : false,
  B_SGN extends '+' ? true : false
> extends true
  ? B_SGN extends '+'
    ? DigitList._$toNumber<MODULUS_LIST>
    : Number._$negate<DigitList._$toNumber<MODULUS_LIST>>
  : B_SGN extends '+'
  ? DigitList._$toNumber<DigitList._$subtract<B_LIST, MODULUS_LIST>>
  : Number._$negate<
      DigitList._$toNumber<DigitList._$subtract<B_LIST, MODULUS_LIST>>
    >

interface Modulo_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? _$modulo<A, typeof x> : never
}

export interface Modulo extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? Modulo_T<typeof x> : never
}
