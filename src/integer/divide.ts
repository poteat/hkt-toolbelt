import { Type, Number, Kind, DigitList, NaturalNumber, Boolean } from '..'

export type _$divide<
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
  QUOTIENT_LIST extends DigitList.DigitList = DigitList._$divide<
    A_LIST,
    B_LIST
  >,
  QUOTIENT extends Number.Number = DigitList._$toNumber<QUOTIENT_LIST>
> = Boolean._$xnor<
  A_SGN extends '+' ? true : false,
  B_SGN extends '+' ? true : false
> extends true
  ? QUOTIENT
  : Number._$negate<QUOTIENT>

interface Divide_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? _$divide<A, typeof x> : never
}

export interface Divide extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? Divide_T<typeof x> : never
}
