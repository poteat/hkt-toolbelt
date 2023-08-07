import { $, Kind, Type } from '..';

export type _$mapValues<
  T extends Record<string, unknown>,
  F extends Kind.Kind
> = {
  [key in keyof T]: $<F, Type._$cast<T[key], Kind._$inputOf<F>>>;
};

interface MapValues_T<F extends Kind.Kind> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<string, Kind._$inputOf<F>>>
  ): _$mapValues<typeof x, F>;
}

export interface MapValues extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): MapValues_T<typeof x>;
}
