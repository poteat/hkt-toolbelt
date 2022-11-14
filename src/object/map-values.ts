import { $, Kind, Type } from "..";

export type _$mapValues<
  T extends Record<string, unknown>,
  F extends Kind.Kind
> = {
  [key in keyof T]: $<F, Type._$cast<T[key], Kind._$inputOf<F>>>;
};

export abstract class MapValues<F extends Kind.Kind> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Record<string, Kind._$inputOf<F>>>
  ) => _$mapValues<typeof x, F>;
}
