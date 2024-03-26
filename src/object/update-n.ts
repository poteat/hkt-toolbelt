import { Kind, Type } from '..'
import { KeyOrPath } from './at-path-n'
import { _$update } from './update'

/**
 * `_updateN` is a type-level function that Update multiple nested values in object O
 *  at paths and keys specified in P, using values specified in V.
 *
 * @template P - The paths to the properties.
 * @template V - The new values for the properties.
 * @template O - The object to update.
 */
export type _$updateN<
  P extends KeyOrPath[],
  V extends unknown[],
  O extends Record<PropertyKey, unknown>
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

/**
 * Intermediate interface for currying `_updateN`.
 */
interface UpdateN_T2<PATHS extends KeyOrPath[], VALUE extends unknown[]>
  extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<PropertyKey, unknown>>
  ): _$updateN<PATHS, VALUE, typeof x>
}

/**
 * Intermediate interface for currying `_updateN`.
 */
interface UpdateN_T<PATHS extends KeyOrPath[]> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): UpdateN_T2<PATHS, typeof x>
}

/**
 * `UpdateN` is a type-level function that updates nested properties of an object based on multiple paths.
 */
export interface UpdateN extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], KeyOrPath[]>): UpdateN_T<typeof x>
}
