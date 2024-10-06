import { Kind, Type, Object as Object_ } from '..'

/**
 * `_$values` is a type-level function that takes in a record `O`, and returns
 * a tuple of the values of the record.
 *
 * @template {Record<PropertyKey, unknown>} O - The record to get the values of.
 *
 * @example
 * ```ts
 * type T0 = _$values<{ foo: 'foo'; bar: 'bar'; baz: 'baz' }> // ['foo', 'bar', 'baz']
 * ```
 */
export type _$values<
  T extends Record<string, unknown>,
  Keys = Object_._$keys<T>
> = {
  [key in keyof Keys]: T[Type._$cast<Keys[key], keyof T>]
}

/**
 * `Values` is a type-level function that takes in a record `O`, and returns
 * a tuple of the values of the record.
 *
 * @template {Record<PropertyKey, unknown>} O - The record to get the values of.
 *
 * @example
 * ```ts
 * type T0 = $<Object.Values, { foo: 'foo'; bar: 'bar'; baz: 'baz' }> // ['foo', 'bar', 'baz']
 * ```
 */
export interface Values extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Record<string, unknown>>): _$values<typeof x>
}

/**
 * Given a record, return a tuple of the values of the record.
 *
 * @param {Record<PropertyKey, unknown>} x - The record to get the values of.
 *
 * @example
 * ```ts
 * import { Object } from "hkt-toolbelt";
 *
 * const result = Object.values({ foo: 'foo', bar: 'bar', baz: 'baz' })
 * //    ^? ['foo', 'bar', 'baz']
 * ```
 */
export const values = ((x: Record<PropertyKey, unknown>) =>
  Object.values(x)) as Kind._$reify<Values>
