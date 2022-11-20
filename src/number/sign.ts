import { $, Type, Kind, Number } from "..";

export type _$sign<T extends Number.Number> = number extends T
  ? "+" | "-"
  : `${T}` extends `-${string}`
  ? "-"
  : "+";

export declare abstract class Sign extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], Number.Number>) => _$sign<typeof x>;
}
