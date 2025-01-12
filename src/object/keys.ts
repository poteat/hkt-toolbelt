import { Kind, Type, Union } from '..'

/**
 * Given a record, return a list of the keys of the record.
 *
 * @param {Record<string, unknown>} x - The record to get the keys from.
 *
 * @example
 * ```ts
 * import { Object } from "hkt-toolbelt";
 *
 * type T0 = Object._$keys<{ foo: 'foo'; bar: 'bar' }>; // ['foo', 'bar']
 * ```
 */
export type _$keys<T extends Record<string, unknown>> = Union._$toList<keyof T>

/**
 * Given a record, return a list of the keys of the record.
 *
 * @param {Record<string, unknown>} x - The record to get the keys from.
 *
 * @example
 * ```ts
 * import { Object } from "hkt-toolbelt";
 *
 * type T0 = $<Object.Keys, { a: 1, b: 2, c: 3 }>; // ["a", "b", "c"]
 * ```
 */
export interface Keys extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Record<string, unknown>>): _$keys<typeof x>
}

/**
 * Given a record, return a list of the keys of the record.
 *
 * @param {Record<string, unknown>} x - The record to get the keys from.
 *
 * @example
 * ```ts
 * import { Object } from "hkt-toolbelt";
 *
 * const T0 = Object.keys({ a: 1, b: 2, c: 3 }); // ["a", "b", "c"]
 * ```
 */
export const keys = ((x: Record<PropertyKey, unknown>) =>
  Object.keys(x)) as Kind._$reify<Keys>
