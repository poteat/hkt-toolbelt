import { Kind, Type } from '..'

type _$atPath2<Path extends PropertyKey[], T> = Path extends [
  infer Head,
  ...infer Tail
]
  ? Tail extends []
    ? Head extends keyof T
      ? T[Head]
      : never
    : _$atPath2<Type._$cast<Tail, PropertyKey[]>, T[Type._$cast<Head, keyof T>]>
  : never

/**
 * `_$atPath` is a type-level function that takes in a path `P` and a record `O`,
 * and returns the value at the specified path in the record.
 *
 * @template {PropertyKey[]} P - The path to get the value from.
 * @template {Record<PropertyKey, unknown>} O - The record to get the value from.
 *
 * @example
 * ```ts
 * type T0 = _$atPath<['foo', 'bar'], { foo: { bar: 'baz' } }> // 'baz'
 * ```
 */
export type _$atPath<Path extends PropertyKey[], T> = Path extends []
  ? T
  : _$atPath2<Path, T>

interface AtPath_T<Path extends PropertyKey[]> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<PropertyKey, unknown>>
  ): _$atPath<Path, typeof x>
}

/**
 * `AtPath` is a type-level function that takes in a path `P` and a record `O`,
 * and returns the value at the specified path in the record.
 *
 * @template {PropertyKey[]} P - The path to get the value from.
 * @template {Record<PropertyKey, unknown>} O - The record to get the value from.
 *
 * @example
 * ```ts
 * type T0 = $<$<Object.AtPath, ['foo', 'bar']>, { foo: { bar: 'baz' } }> // 'baz'
 * ```
 */
export interface AtPath extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], PropertyKey[]>): AtPath_T<typeof x>
}

/**
 * Given a path and a record, return the value at the specified path in the
 * record.
 *
 * @param {PropertyKey[]} p - The path to get the value from.
 * @param {Record<PropertyKey, unknown>} o - The record to get the value from.
 *
 * @example
 * ```ts
 * import { Object } from "hkt-toolbelt";
 *
 * const result = Object.atPath(['foo', 'bar'])({ foo: { bar: 'baz' } })
 * //    ^? 'baz'
 * ```
 */
export const atPath = ((p: PropertyKey[]) =>
  (o: Record<PropertyKey, unknown>) => {
    let result: unknown = o

    for (const key of p) {
      result = (result as Record<PropertyKey, unknown>)?.[
        key as keyof typeof result
      ]
    }

    return result
  }) as Kind._$reify<AtPath>
