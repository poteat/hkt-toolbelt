import { Kind, Type } from '..'

/**
 * `_$assign` is a type-level function that takes in a key `K`, a value `V`,
 * and a record `O`, and returns a new record with the key `K` assigned the
 * value `V`.
 *
 * @template {string | number | symbol} K - The key to assign the value to.
 * @template {unknown} V - The value to assign to the key.
 * @template {Record<PropertyKey, unknown>} O - The record to assign the value to.
 *
 * @example
 * ```ts
 * type T0 = _$assign<'foo', 'bar', {}> // { foo: 'bar' }
 * type T1 = _$assign<'foo', 42, {}> // { foo: 42 }
 * ```
 */
export type _$assign<
  K extends PropertyKey,
  V,
  O extends Record<PropertyKey, unknown>
> = Omit<O, K> & {
  [key in K]: V
}

interface Assign_T2<K extends PropertyKey, V> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<PropertyKey, unknown>>
  ): _$assign<K, V, typeof x>
}

interface Assign_T1<K extends PropertyKey> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown>): Assign_T2<K, typeof x>
}

/**
 * `Assign` is a type-level function that takes in a key `K` and a value `V`,
 * and a record `O`, and returns a new record with the key `K` assigned the
 * value `V`.
 *
 * @template {string | number | symbol} K - The key to assign the value to.
 * @template {unknown} V - The value to assign to the key.
 * @template {Record<PropertyKey, unknown>} O - The record to assign the value to.
 *
 * @example
 * ```ts
 * type T0 = $<$<$<Object.Assign, 'foo'>, 'bar'>, {}> // { foo: 'bar' }
 * type T1 = $<$<$<Object.Assign, 'foo'>, 42>, {}> // { foo: 42 }
 * ```
 */
export interface Assign extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], PropertyKey>): Assign_T1<typeof x>
}
