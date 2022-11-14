import { Type, Kind } from "..";

export type _$tail<S extends string> = S extends `${string}${infer Tail}`
  ? Tail extends ""
    ? S
    : Tail
  : string extends S
  ? S
  : "";

export abstract class Tail extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], string>) => _$tail<typeof x>;
}
