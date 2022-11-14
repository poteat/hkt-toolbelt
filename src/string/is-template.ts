import { Type, Conditional, Kind, List } from "..";
import { _$toList } from "./to-list";

export type _$isTemplate<S extends string> = string extends S
  ? false
  : List._$some<Conditional.Equals<string>, _$toList<S>>;

export abstract class IsTemplate extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], string>) => _$isTemplate<typeof x>;
}
