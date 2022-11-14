import { Type, Kind } from "..";

export type _$toLower<S extends string> = Lowercase<S>;

export abstract class ToLower extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], string>) => _$toLower<typeof x>;
}
