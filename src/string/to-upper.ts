import { Type, Kind } from "..";

export type _$toUpper<S extends string> = Uppercase<S>;

export abstract class ToUpper extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], string>) => _$toUpper<typeof x>;
}
