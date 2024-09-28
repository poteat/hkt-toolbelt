import { Type, Kind, Object } from '..'

/**
 * `_$entries` is a type-level function that takes in a record `O`, and returns
 * a list of key-value pairs of the record.
 *
 * Order is not guaranteed.
 *
 * @template {Record<PropertyKey, unknown>} O - The record to get the entries of.
 *
 * @example
 * ```ts
 * type T0 = _$entries<{ foo: 'bar', baz: 42 }> // [['foo', 'bar'], ['baz', 42]]
 * ```
 */
export type _$entries<
  O extends Record<PropertyKey, unknown>,
  Keys = Object._$keys<O>
> = {
  [I in keyof Keys]: [Keys[I], O[Type._$cast<Keys[I], keyof O>]]
}

/**
 * `Entries` is a type-level function that takes in a record `O`, and returns
 * a list of key-value pairs of the record.
 *
 * Order is not guaranteed.
 *
 * @template {Record<PropertyKey, unknown>} O - The record to get the entries of.
 *
 * @example
 * ```ts
 * type T0 = $<Object.Entries, { foo: 'bar'; baz: 42 }>
 * //   ^? [['foo', 'bar'], ['baz', 42]]
 * ```
 */
export interface Entries extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<PropertyKey, unknown>>
  ): _$entries<typeof x>
}
