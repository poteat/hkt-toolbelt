import { Type, Number, Kind, NaturalNumber } from '..';

interface DivideBy_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true
    ? NaturalNumber._$divide<typeof x, A>
    : never;
}

export interface DivideBy extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? DivideBy_T<typeof x> : never;
}
