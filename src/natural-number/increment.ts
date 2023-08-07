import { Type, Kind, DigitList, NaturalNumber, Number } from '..'

export type _$increment<
  A extends Number.Number,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<A>,
  INCREMENT extends DigitList.DigitList = DigitList._$increment<A_LIST>,
  RESULT extends Number.Number = Number._$fromString<
    DigitList._$toString<INCREMENT>
  >
> = RESULT

export interface Increment extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? _$increment<typeof x> : never
}
