import { Kind, Type } from '..'
import { KeyOrPath } from './at-path-n'
import { _$update } from './update'

export type _$updateN<
  P extends KeyOrPath[],
  V extends unknown[],
  O extends Record<string, unknown>
> = [[P], [V]] extends [
  [[infer Head, ...infer Tail extends KeyOrPath[]]],
  [[infer VHead, ...infer VTail]]
]
  ? _$updateN<
      Tail,
      VTail,
      Type._$cast<
        _$update<
          Type._$cast<
            Head extends PropertyKey[] ? Head : [Head],
            PropertyKey[]
          >,
          VHead,
          O
        >,
        Record<PropertyKey, unknown>
      >
    >
  : O

interface UpdateN_T2<PATHS extends KeyOrPath[], VALUE extends unknown[]>
  extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<PropertyKey, unknown>>
  ): _$updateN<PATHS, VALUE, typeof x>
}

interface UpdateN_T<PATHS extends KeyOrPath[]> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): UpdateN_T2<PATHS, typeof x>
}

export interface UpdateN extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], KeyOrPath[]>): UpdateN_T<typeof x>
}
