import { Kind, Type, Union } from '..'

/**
 * Given a record, return a list of the keys of the record.
 * Numeric keys are converted to strings to match JavaScript's runtime behavior.
 *
 * @param {Record<PropertyKey, unknown>} x - The record to get the keys from.
 *
 * @example
 * ```ts
 * import { Object } from "hkt-toolbelt";
 *
 * type T0 = Object._$keys<{ foo: 'foo'; bar: 'bar' }>; // ['foo', 'bar']
 * type T1 = Object._$keys<{ 1: 'a'; 2: 'b' }>; // ['1', '2']
 * ```
 */
export type _$keys<T extends Record<PropertyKey, unknown>> = Union._$toList<
  keyof T extends infer K ? (K extends number ? `${K}` : K) : never
>

/**
 * Given a record, return a list of the keys of the record.
 * Numeric keys are converted to strings to match JavaScript's runtime behavior.
 *
 * @param {Record<PropertyKey, unknown>} x - The record to get the keys from.
 *
 * @example
 * ```ts
 * import { Object } from "hkt-toolbelt";
 *
 * type T0 = $<Object.Keys, { a: 1, b: 2, c: 3 }>; // ["a", "b", "c"]
 * type T1 = $<Object.Keys, { 1: 'a', 2: 'b' }>; // ["1", "2"]
 * ```
 */
export interface Keys extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<PropertyKey, unknown>>
  ): _$keys<typeof x>
}

/**
 * Given a record, return a list of the keys of the record.
 * Numeric keys are converted to strings to match JavaScript's runtime behavior.
 *
 * @param {Record<PropertyKey, unknown>} x - The record to get the keys from.
 *
 * @example
 * ```ts
 * import { Object } from "hkt-toolbelt";
 *
 * const T0 = Object.keys({ a: 1, b: 2, c: 3 }); // ["a", "b", "c"]
 * const T1 = Object.keys({ 1: 'a', 2: 'b' }); // ["1", "2"]
 * ```
 */
export const keys = ((x: Record<PropertyKey, unknown>) =>
  Object.keys(x)) as Kind._$reify<Keys>
