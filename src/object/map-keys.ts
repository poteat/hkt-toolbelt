import { $, Kind, Type } from "..";

export type _$mapKeys<
  T extends Record<string, unknown>,
  F extends Kind.Kind<(x: string) => string | number | symbol>
> = {
  [key in keyof T as $<F, Type._$cast<key, Kind._$inputOf<F>>>]: T[key];
};

export interface MapKeys<
  F extends Kind.Kind<(x: string) => string | number | symbol>
> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<string, unknown>>
  ): _$mapKeys<typeof x, F>;
}
