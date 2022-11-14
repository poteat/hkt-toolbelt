import { Type, Kind } from "..";

export type _$first<S extends string> = S extends `${infer Head}${string}`
  ? Head
  : string extends S
  ? S
  : "";

export abstract class First extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], string>) => _$first<typeof x>;
}
