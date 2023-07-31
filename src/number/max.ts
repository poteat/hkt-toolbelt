import { Kind, Type, Number } from ".."

export type _$max<
  A extends Number.Number,
  B extends Number.Number
> = Number._$compare<A, B> extends 1 ? A : B

interface Max_T<N extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$max<typeof x, N>
}

export interface Max extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Max_T<typeof x>
}
