import { Kind, Object, Type } from '..'

/**
 * `_$atPathInObject` is a type-level function that takes in a record `O` and a
 * path `P`, and returns the value at the specified path in the record.
 *
 * This is an argument swapped version of `Object._$atPath`.
 *
 * @template {Record<PropertyKey, unknown>} O - The record to get the value from.
 * @template {PropertyKey[]} P - The path to get the value from.
 *
 * @example
 * ```ts
 * type T0 = _$atPathInObject<{ foo: { bar: 'baz' } }, ['foo', 'bar']> // 'baz'
 * ```
 */
export type _$atPathInObject<
  O extends Record<PropertyKey, unknown>,
  P extends PropertyKey[]
> = Object._$atPath<P, O>

interface AtPathInObject_T<O extends Record<PropertyKey, unknown>>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], PropertyKey[]>): _$atPathInObject<O, typeof x>
}

/**
 * `AtPathInObject` is a type-level function that takes in a record `O` and a
 * path `P`, and returns the value at the specified path in the record.
 *
 * This is an argument swapped version of `Object.AtPath`.
 *
 * @template {Record<PropertyKey, unknown>} O - The record to get the value from.
 * @template {PropertyKey[]} P - The path to get the value from.
 *
 * @example
 * ```ts
 * type T0 = $<$<Object.AtPathInObject, { foo: { bar: 'baz' } }>, ['foo', 'bar']> // 'baz'
 * ```
 */
export interface AtPathInObject extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<PropertyKey, unknown>>
  ): AtPathInObject_T<typeof x>
}

/**
 * Given a record and a path, return the value at the specified path in the
 * record.
 *
 * This is an argument swapped version of `Object.AtPath`.
 *
 * @param {Record<PropertyKey, unknown>} o - The record to get the value from.
 * @param {PropertyKey[]} p - The path to get the value from.
 *
 * @example
 * ```ts
 * import { Object } from "hkt-toolbelt";
 *
 * const result = Object.atPathInObject({ foo: { bar: 'baz' } })(['foo', 'bar'])
 * //    ^? 'baz'
 * ```
 */
export const atPathInObject = ((o: Record<PropertyKey, unknown>) =>
  (p: PropertyKey[]) =>
    Object.atPath(p)(o as never)) as unknown as Kind._$reify<AtPathInObject>
