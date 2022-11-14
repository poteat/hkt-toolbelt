import { Type, Kind } from "..";

export type _$unshift<X, T extends unknown[]> = [X, ...T];

export abstract class Unshift<X> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], unknown[]>
  ) => _$unshift<X, typeof x>;
}
