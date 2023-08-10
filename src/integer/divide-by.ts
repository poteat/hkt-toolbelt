import { Kind, Type, Number, Integer } from '..'

interface DivideBy_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true
    ? Integer._$divide<typeof x, A>
    : never
}

export interface DivideBy extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? DivideBy_T<typeof x> : never
}
