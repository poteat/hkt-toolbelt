import { $, Kind, Type } from "..";
import { _$deepInputOf } from "./deep-input-of";

export type _$deepMapValues<F extends Kind.Kind, O> = {
  [key in keyof O]: Type._$display<
    O[key] extends Record<string, unknown>
      ? _$deepMapValues<F, O[key]>
      : $<F, Type._$cast<O[key], Kind._$inputOf<F>>>
  >;
};

export interface DeepMapValues<F extends Kind.Kind> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], _$deepInputOf<F>>
  ): _$deepMapValues<F, typeof x>;
}
