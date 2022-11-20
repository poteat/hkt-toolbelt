import { Type, Kind } from "..";

export type _$pop<T extends readonly unknown[]> = T extends [
  ...infer Head,
  unknown
]
  ? Head
  : never;

export abstract class Pop extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], readonly unknown[]>
  ) => _$pop<typeof x>;
}
