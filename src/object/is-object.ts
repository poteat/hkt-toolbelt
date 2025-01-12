import { Type, Kind } from '..'

/**
 * Given a value, return whether or not it is an object.
 *
 * @param {unknown} x - The value to check.
 * @return {boolean} Whether or not the value is an object.
 *
 * @example
 * ```ts
 * import { Object } from "hkt-toolbelt";
 *
 * const T0 = Object._$isObject<42>; // false
 * const T1 = Object._$isObject<{ foo: 'bar' }>; // true
 * ```
 */
export type _$isObject<T> =
  T extends Record<PropertyKey, unknown> ? true : false

/**
 * Given a value, return whether or not it is an object.
 *
 * @param {unknown} x - The value to check.
 * @return {boolean} Whether or not the value is an object.
 *
 * @example
 * ```ts
 * import { Object } from "hkt-toolbelt";
 *
 * const T0 = $<Object.IsObject, 42>; // false
 * const T1 = $<Object.IsObject, { foo: 'bar' }>; // true
 * ```
 */
export interface IsObject extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown>): _$isObject<typeof x>
}

/**
 * Given a value, return whether or not it is an object.
 *
 * @param {unknown} x - The value to check.
 * @return {boolean} Whether or not the value is an object.
 *
 * @example
 * ```ts
 * import { Object } from "hkt-toolbelt";
 *
 * const T0 = $<$<Object.IsObject, 42>>; // false
 * const T1 = $<$<Object.IsObject, { foo: 'bar' }>>; // true
 * ```
 */
export const isObject = ((x: unknown) =>
  typeof x === 'object' && x !== null) as unknown as Kind._$reify<IsObject>
