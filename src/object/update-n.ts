import { Kind, Type, Object } from '..'
import { KeyOrPath } from './key-or-path'

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
        Object._$update<
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
interface UpdateN_T2<Paths extends KeyOrPath[], Value extends unknown[]>
  extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<PropertyKey, unknown>>
  ): _$updateN<Paths, Value, typeof x>
}

/**
 * Intermediate interface for currying `_updateN`.
 */
interface UpdateN_T<Paths extends KeyOrPath[]> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): UpdateN_T2<Paths, typeof x>
}

/**
 * `UpdateN` is a type-level function that updates nested properties of an object based on multiple paths.
 */
export interface UpdateN extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], KeyOrPath[]>): UpdateN_T<typeof x>
}
