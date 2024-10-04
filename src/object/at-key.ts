import { Kind, Type } from '..'

/**
 * `AtKey` is a type-level function that returns the value at a given key in an object.
 *
 * @template O - The object to get the value from.
 * @template K - The key to get the value of.
 *
 * @example
 * ```ts
 * type T0 = Object._$atKey<{ a: 1; b: 2; c: 3 }, 'a'> // 1
 * type T1 = Object._$atKey<{ a: 1; b: 2; c: 3 }, 'd'> // never
 * ```
 */

export type _$atKey<
  O extends Record<PropertyKey, unknown>,
  K extends PropertyKey
> = K extends keyof O ? O[K] : never

interface AtKey_T<O extends Record<PropertyKey, unknown>> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], PropertyKey>): _$atKey<O, typeof x>
}

/**
 * Given an object and a key, return the value at the specified key.
 *
 * @param {Record<PropertyKey, unknown>} x - The object to get the value from.
 * @param {PropertyKey} k - The key to get the value of.
 *
 * @example
 * ```ts
 * import { Object } from "hkt-toolbelt";
 *
 * const result = Object.atKey({ a: 1, b: 2, c: 3 })('a')
 * //    ^? 1
 * ```
 */
export interface AtKey extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<PropertyKey, unknown>>
  ): AtKey_T<typeof x>
}

/**
 * Given an object and a key, return the value at the specified key.
 *
 * @param {Record<PropertyKey, unknown>} x - The object to get the value from.
 * @param {PropertyKey} k - The key to get the value of.
 *
 * @example
 * ```ts
 * import { Object } from "hkt-toolbelt";
 *
 * const result = Object.atKey({ a: 1, b: 2, c: 3 })('a')
 * //    ^? 1
 * ```
 */
export const atKey = ((x: Record<PropertyKey, unknown>) => (k: PropertyKey) =>
  k in x ? x[k] : Type.never) as Kind._$reify<AtKey>
