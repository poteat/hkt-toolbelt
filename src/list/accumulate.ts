import { $, Kind, Type, Function, List } from ".."

export type _$accumulate<
  F extends Kind.Kind<(x: never) => Kind.Kind>,
  X extends List.List,
  O,
  CURR = $<List.First, X>,
  REST extends List.List = $<List.Shift, X>,
  ACC extends unknown = List._$reduce<F, [CURR], O>,
  RESULT = X extends [] ? [] : List._$unshift<ACC, _$accumulate<F, REST, ACC>>
> = 0 extends 1 ? never : RESULT

interface Accumulate_T2<F extends Kind.Kind<(x: never) => Kind.Kind>, X>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$accumulate<F, typeof x, X>
}

interface Accumulate_T<F extends Kind.Kind<(x: never) => Kind.Kind>>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown>): Accumulate_T2<F, typeof x>
}

export interface Accumulate extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind<(x: never) => Kind.Kind>>
  ): Accumulate_T<typeof x>
}
