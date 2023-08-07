import { Type, Number, Kind, NaturalNumber } from '..';

interface SubtractBy_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true
    ? NaturalNumber._$subtract<typeof x, A>
    : never;
}

export interface SubtractBy extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? SubtractBy_T<typeof x> : never;
}
