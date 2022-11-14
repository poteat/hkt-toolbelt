import { $, Boolean, Type, Kind } from "..";

export type _$every<
  F extends Kind.Kind<(x: never) => boolean>,
  T extends unknown[],
  O extends boolean = true
> = T extends [infer Head, ...infer Rest]
  ? _$every<
      F,
      Rest,
      Boolean._$and<O, $<F, Type._$cast<Head, Kind._$inputOf<F>>>>
    >
  : O;

export abstract class Every<
  F extends Kind.Kind<(x: never) => boolean>
> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Kind._$inputOf<F>[]>
  ) => _$every<F, typeof x>;
}
