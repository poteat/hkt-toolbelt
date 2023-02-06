import { Type, Number, DigitList, Kind } from "..";

export type _$toList<
  S extends Number.Number,
  O extends string[] = []
> = Number._$toString<S> extends `${infer Head}${infer Tail}`
  ? _$toList<Tail, [...O, Head]>
  : O extends DigitList.DigitList
  ? O
  : ["0"];

export interface ToList extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? _$toList<typeof x> : never;
}
