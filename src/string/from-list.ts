import { Type, Kind } from "..";

export type _$fromList<T extends string[]> = T extends [
  infer Head extends string,
  ...infer Tail extends string[]
]
  ? `${Head}${_$fromList<Tail>}`
  : "";

export abstract class FromList extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], string[]>) => _$fromList<typeof x>;
}
