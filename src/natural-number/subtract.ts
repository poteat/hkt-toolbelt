import { Number, NaturalNumber, DigitList, Type, Kind } from '..'

export type _$subtract<
  A extends Number.Number,
  B extends Number.Number,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<A>,
  B_LIST extends DigitList.DigitList = NaturalNumber._$toList<B>,
  SUB_LIST extends DigitList.DigitList = DigitList._$subtract<A_LIST, B_LIST>,
  RESULT = DigitList._$toNumber<SUB_LIST>
> = RESULT

interface Subtract_T<X extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? _$subtract<X, typeof x> : never
}

export interface Subtract extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? Subtract_T<typeof x> : never
}
