import { Type, Kind } from "..";

export type _$toList<
  S extends string,
  O extends string[] = []
> = string extends S
  ? [string]
  : S extends `${infer Head}${infer Tail}`
  ? _$toList<Tail, [...O, Head]>
  : O;

export abstract class ToList extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], string>) => _$toList<typeof x>;
}
