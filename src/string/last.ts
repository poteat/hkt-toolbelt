import { Type, Kind } from "..";

export type _$last<S extends string> = S extends `${string}${infer Tail}`
  ? Tail extends ""
    ? S
    : _$last<Tail>
  : string extends S
  ? S
  : "";

export abstract class Last extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], string>) => _$last<typeof x>;
}
