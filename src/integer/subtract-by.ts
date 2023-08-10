import { Kind, Type, Number, Integer } from '..'

interface SubtractBy_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true
    ? Integer._$subtract<typeof x, A>
    : never
}

export interface SubtractBy extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? SubtractBy_T<typeof x> : never
}
