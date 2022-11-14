import { Type, Kind } from "..";

export type _$prepend<
  Prefix extends string,
  S extends string
> = `${Prefix}${S}`;

export abstract class Prepend<Prefix extends string> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], string>
  ) => _$prepend<Prefix, typeof x>;
}
