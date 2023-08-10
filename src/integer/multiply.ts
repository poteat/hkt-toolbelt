import { Type, Number, Kind, DigitList, Boolean, NaturalNumber } from '..'

export type _$multiply<
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
  PRODUCT_LIST extends DigitList.DigitList = DigitList._$multiply<
    A_LIST,
    B_LIST
  >,
  PRODUCT extends Number.Number = DigitList._$toNumber<PRODUCT_LIST>
> = Boolean._$xnor<
  A_SGN extends '+' ? true : false,
  B_SGN extends '+' ? true : false
> extends true
  ? PRODUCT
  : Number._$negate<PRODUCT>

interface Multiply_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? _$multiply<A, typeof x> : never
}

export interface Multiply extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? Multiply_T<typeof x> : never
}
