import { Type, Kind } from "..";

export type _$shift<T extends unknown[]> = T extends [unknown, ...infer Tail]
  ? Tail
  : never;

export abstract class Shift extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], unknown[]>) => _$shift<typeof x>;
}
