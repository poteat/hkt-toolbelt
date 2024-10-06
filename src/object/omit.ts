import { Kind, Type } from '..'

/**
 * _$omit is a type-level function that takes in a list of keys and an object,
 * and returns a new object with all keys except the specified keys.
 *
 * @template {PropertyKey[]} K - The list of keys to omit.
 * @template {Record<PropertyKey, unknown>} O - The object to omit from.
 *
 * @example
 * ```ts
 * type T0 = _$omit<['foo'], { foo: 'bar', baz: 'qux' }> // { baz: 'qux' }
 * ```
 */
export type _$omit<
  K extends PropertyKey[],
  O extends Record<PropertyKey, unknown>
> = {
  [key in keyof O as key extends K[number] ? never : key]: O[key]
}

interface Omit_T<K extends PropertyKey[]> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<PropertyKey, unknown>>
  ): _$omit<K, typeof x>
}

/**
 * Given a list of keys and an object, return a new object with all keys
 * except the specified keys.
 *
 * @param {PropertyKey[]} k - The list of keys to omit.
 * @param {Record<PropertyKey, unknown>} o - The object to omit from.
 *
 * @example
 * ```ts
 * import { Object } from "hkt-toolbelt";
 *
 * const result = Object.omit(['foo'])({ foo: 'bar', baz: 'qux' })
 * //    ^? { baz: 'qux' }
 * ```
 */
export interface Omit extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], PropertyKey[]>): Omit_T<typeof x>
}

/**
 * Given a list of keys and an object, return a new object with all keys
 * except the specified keys.
 *
 * @param {PropertyKey[]} k - The list of keys to omit.
 * @param {Record<PropertyKey, unknown>} o - The object to omit from.
 *
 * @example
 * ```ts
 * import { Object } from "hkt-toolbelt";
 *
 * const result = Object.omit(['foo'])({ foo: 'bar', baz: 'qux' })
 * //    ^? { baz: 'qux' }
 * ```
 */
export const omit = (k: PropertyKey[]) => (o: Record<PropertyKey, unknown>) => {
  const result = {} as Record<PropertyKey, unknown>

  const set = new Set(k)

  for (const key in o) {
    if (!set.has(key as PropertyKey)) {
      result[key] = o[key]
    }
  }

  return result
}
