import { $, Boolean, Type, Kind } from "..";

export type _$some<
  F extends Kind.Kind<(x: never) => boolean>,
  T extends unknown[],
  O extends boolean = false
> = T extends [infer Head, ...infer Rest]
  ? _$some<F, Rest, Boolean._$or<O, $<F, Type._$cast<Head, Kind._$inputOf<F>>>>>
  : O;

export abstract class Some<
  F extends Kind.Kind<(x: never) => boolean>
> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Kind._$inputOf<F>[]>
  ) => _$some<F, typeof x>;
}
