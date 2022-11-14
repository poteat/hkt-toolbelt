import { Type, Kind } from "..";

export type _$isVariadic<T extends unknown[]> = number extends T["length"]
  ? true
  : false;

export abstract class IsVariadic extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], unknown[]>
  ) => _$isVariadic<typeof x>;
}
