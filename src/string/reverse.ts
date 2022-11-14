import { Type, Kind } from "..";

export type _$reverse<
  S extends string,
  O extends string = ""
> = S extends `${infer Head}${infer Tail}`
  ? _$reverse<Tail, `${Head}${O}`>
  : `${string extends S ? string : ""}${O}`;

export abstract class Reverse extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], string>) => _$reverse<typeof x>;
}
