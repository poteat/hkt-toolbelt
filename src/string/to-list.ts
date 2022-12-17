import { Type, Kind } from "..";

export type _$toList<S extends string, O extends string[] = []> = 0 extends 1
  ? never
  : string extends S
  ? [string]
  : S extends `${infer Head}${infer Tail}`
  ? _$toList<Tail, [...O, Head]>
  : O;

export abstract class ToList extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], string>) => _$toList<typeof x>;
}
