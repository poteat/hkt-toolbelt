import { $, Boolean, Type, Kind } from '..'

export type _$some<
  F extends Kind.Kind<(x: never) => boolean>,
  T extends unknown[],
  O extends boolean = false
> = 0 extends 1
  ? never
  : T extends [infer Head, ...infer Rest]
    ? _$some<
        F,
        Rest,
        Boolean._$or<O, $<F, Type._$cast<Head, Kind._$inputOf<F>>>>
      >
    : O

interface Some_T<T extends Kind.Kind<(x: never) => boolean>> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind._$inputOf<T>[]>): _$some<T, typeof x>
}

export interface Some extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind<(x: never) => boolean>>
  ): Some_T<typeof x>
}
