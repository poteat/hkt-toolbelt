import { $, Kind, Type, Object } from "..";

export type _$deepMapValues<F extends Kind.Kind, O> = {
  [key in keyof O]: Type._$display<
    O[key] extends Record<string, unknown>
      ? _$deepMapValues<F, O[key]>
      : $<F, Type._$cast<O[key], Kind._$inputOf<F>>>
  >;
};

interface DeepMapValues_T<T extends Kind.Kind> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Object._$deepInputOf<T>>
  ): _$deepMapValues<T, typeof x>;
}

export interface DeepMapValues extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): DeepMapValues_T<typeof x>;
}
