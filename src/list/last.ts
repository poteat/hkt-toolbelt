import { Type, Kind } from "..";

export type _$last<T extends unknown[]> = T extends [infer X]
  ? X
  : T extends [unknown, ...infer Tail]
  ? _$last<Tail>
  : T extends [...unknown[], infer X]
  ? X
  : T[number];

export abstract class Last extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], unknown[]>) => _$last<typeof x>;
}
