import { Type, Kind } from "..";

export type _$startsWith<
  Prefix extends string,
  S extends string
> = S extends `${Prefix}${string}` ? true : false;

export abstract class StartsWith<Prefix extends string> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], string>
  ) => _$startsWith<Prefix, typeof x>;
}
