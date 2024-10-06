import { Kind, Type } from '..'

/**
 * _$pick is a type-level function that takes in a list of keys and an object,
 * and returns a new object with only the specified keys.
 *
 * @template {PropertyKey[]} K - The list of keys to pick.
 * @template {Record<PropertyKey, unknown>} O - The object to pick from.
 *
 * @example
 * ```ts
 * type T0 = _$pick<['foo'], { foo: 'bar', baz: 'qux' }> // { foo: 'bar' }
 * ```
 */
export type _$pick<
  K extends PropertyKey[],
  O extends Record<PropertyKey, unknown>
> = {
  [key in K[number] as key extends keyof O ? key : never]: O[key]
}

interface Pick_T<K extends PropertyKey[]> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<PropertyKey, unknown>>
  ): _$pick<K, typeof x>
}

/**
 * Given a list of keys and an object, return a new object with only the
 * specified keys.
 *
 * @param {PropertyKey[]} k - The list of keys to pick.
 * @param {Record<PropertyKey, unknown>} o - The object to pick from.
 *
 * @example
 * ```ts
 * import { Object } from "hkt-toolbelt";
 *
 * const result = Object.pick(['foo'])({ foo: 'bar', baz: 'qux' })
 * //    ^? { foo: 'bar' }
 * ```
 */
export interface Pick extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], PropertyKey[]>): Pick_T<typeof x>
}

/**
 * Given a list of keys and an object, return a new object with only the
 * specified keys.
 *
 * @param {PropertyKey[]} k - The list of keys to pick.
 * @param {Record<PropertyKey, unknown>} o - The object to pick from.
 *
 * @example
 * ```ts
 * import { Object } from "hkt-toolbelt";
 *
 * const result = Object.pick(['foo'])({ foo: 'bar', baz: 'qux' })
 * //    ^? { foo: 'bar' }
 * ```
 */
export const pick = ((k: PropertyKey[]) =>
  (o: Record<PropertyKey, unknown>) => {
    const result = {} as Record<PropertyKey, unknown>

    for (const key of k) {
      result[key] = o[key]
    }

    return result
  }) as Kind._$reify<Pick>
