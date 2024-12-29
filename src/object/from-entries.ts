import { Union, Type, Kind } from '..'

/**
 * Given a list of key-value pairs, return a record.
 *
 * @template {[PropertyKey, unknown][]} T - The list of key-value pairs.
 * @returns {Record<PropertyKey, unknown>} The record.
 *
 * @example
 * ```ts
 * import { $, Object } from "hkt-toolbelt";
 *
 * type T0 = Object._$fromEntries<[['foo', 'bar'], ['baz', 42]]>
 * //   ^? { foo: 'bar', baz: 42 }
 * ```
 */
export type _$fromEntries<T extends [PropertyKey, unknown][]> =
  Union._$toIntersection<
    {
      [K in keyof T]: { [key in T[K][0]]: T[K][1] }
    }[number]
  >

/**
 * Given a list of key-value pairs, return a record.
 *
 * @template {[PropertyKey, unknown][]} T - The list of key-value pairs.
 * @returns {Record<PropertyKey, unknown>} The record.
 *
 * @example
 * ```ts
 * import { $, Object } from "hkt-toolbelt";
 *
 * type T0 = $<Object.FromEntries, [['foo', 'bar'], ['baz', 42]]>
 * //   ^? { foo: 'bar', baz: 42 }
 * ```
 */
export interface FromEntries extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], [PropertyKey, unknown][]>
  ): _$fromEntries<typeof x>
}

/**
 * Given a list of key-value pairs, return a record.
 *
 * @template {[PropertyKey, unknown][]} T - The list of key-value pairs.
 * @returns {Record<PropertyKey, unknown>} The record.
 *
 * @example
 * ```ts
 * import { $, Object } from "hkt-toolbelt";
 *
 * const T0 = Object.fromEntries([['foo', 'bar'], ['baz', 42]])
 * //    ^? { foo: 'bar', baz: 42 }
 */
export const fromEntries = ((x: [PropertyKey, unknown][]) =>
  Object.fromEntries(x)) as Kind._$reify<FromEntries>
