import { Kind, Type } from '..'

/**
 * `_$at` is a type-level function that returns the value at a given key in an object.
 *
 * @template K - The key to get the value of.
 * @template T - The object to get the value from.
 * @returns The value at the given key in the object.
 *
 * @example
 * type T0 = Object._$at<'a', { a: 1; b: 2; c: 3 }> // 1
 * type T1 = Object._$at<'b', { a: 1; b: 2; c: 3 }> // 2
 */
export type _$at<
  K extends keyof T,
  T extends Record<PropertyKey, unknown>
> = T[K]

interface At_T<K extends PropertyKey> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Record<K, unknown>>): _$at<K, typeof x>
}

/**
 * `At` is a type-level function that returns the value at a given key in an object.
 *
 * @template K - The key to get the value of.
 * @returns The value at the given key in the object.
 *
 * @example
 * type T0 = $<$<Object.At, 'a'>, { a: 1; b: 2; c: 3 }> // 1
 * type T1 = $<$<Object.At, 'b'>, { a: 1; b: 2; c: 3 }> // 2
 */
export interface At extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], PropertyKey>): At_T<typeof x>
}
