import { Type, Number, Kind, NaturalNumber } from "..";

declare abstract class DivideBy_T<A extends Number.Number> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Number.Number>
  ) => Number._$isNatural<typeof x> extends true
    ? NaturalNumber._$divide<typeof x, A>
    : never;
}

export declare abstract class DivideBy extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Number.Number>
  ) => Number._$isNatural<typeof x> extends true ? DivideBy_T<typeof x> : never;
}
