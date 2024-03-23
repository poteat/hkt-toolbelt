import { Kind, Type } from '..'

/**
 * `_update` is a type-level function that update a nested value in object O at path P.
 *
 * @template P - The path to the property to update.
 * @template V - The new value of the property.
 * @template O - The object to update.
 * @template Output - The resulting type after updating the object.
 */
export type _$update<
  P extends PropertyKey[],
  V extends unknown,
  O extends Record<string, unknown>,
  Output = Type._$display<{
    [K in keyof O]: P extends [PropertyKey]
      ? P[0] extends K
        ? V
        : O[K]
      : O[K] extends Record<PropertyKey, unknown>
        ? _$update<RemoveItem<P, K>, V, O[K]>
        : O[K]
  }>
> = Output

type RemoveItem<T extends any[], U> = T extends [infer Head, ...infer Tail]
  ? Head extends U
    ? Tail
    : [Head, ...RemoveItem<Tail, U>]
  : T

/**
 * Intermediate interface for currying `_update`.
 */
interface Update_T2<PATHS extends PropertyKey[], VALUE extends unknown>
  extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<PropertyKey, unknown>>
  ): _$update<PATHS, VALUE, typeof x>
}

/**
 * Intermediate interface for currying `_update`.
 */
interface Update_T<PATHS extends PropertyKey[]> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown>): Update_T2<PATHS, typeof x>
}

/**
 * `Update` is a type-level function that updates nested properties of an object.
 */
export interface Update extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], PropertyKey[]>): Update_T<typeof x>
}
