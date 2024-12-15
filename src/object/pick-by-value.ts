import { $, Kind, Type, Function } from '..'

/**
 * `_$pickByValue` is a type-level function that takes in a record `O` and a
 * predicate `F`, and returns a new record with only the keys for which the
 * predicate returns `true`.
 *
 * @template {Kind.Kind} F - The predicate to apply to each key.
 * @template {Record<PropertyKey, unknown>} O - The record to pick from.
 *
 * @example
 * ```ts
 * type T0 = _$pickByValue<$<String.StartsWith, "f">, { foo: 'foo'; baz: 'faz'; quux: 'corge' }>
 * //    ^? { foo: 'foo'; baz: 'faz' }
 * ```
 */
export type _$pickByValue<
  F extends Kind.Kind,
  O extends Record<PropertyKey, unknown>
> = {
  [key in keyof O as $<F, Type._$cast<O[key], Kind._$inputOf<F>>> extends true
    ? key
    : never]: O[key]
}

interface PickByValue_T<F extends Kind.Kind> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<PropertyKey, unknown>>
  ): _$pickByValue<F, typeof x>
}

/**
 * `PickByValue` is a type-level function that takes in a record `O` and a
 * predicate `F`, and returns a new record with only the keys for which the
 * predicate returns `true`.
 *
 * @template {Kind.Kind} F - The predicate to apply to each key.
 * @template {Record<PropertyKey, unknown>} O - The record to pick from.
 *
 * @example
 * ```ts
 * type T0 = $<$<Object.PickByValue, String.StartsWith>, { foo: 'foo'; baz: 'faz'; quux: 'corge' }>
 * //    ^? { foo: 'foo'; baz: 'faz' }
 * ```
 */
export interface PickByValue extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): PickByValue_T<typeof x>
}

/**
 * Given a record and a predicate, return a new record with only the keys for
 * which the predicate returns `true`.
 *
 * @param {Kind.Kind} f - The predicate to apply to each key.
 * @param {Record<PropertyKey, unknown>} o - The record to pick from.
 *
 * @example
 * ```ts
 * import { Object } from "hkt-toolbelt";
 *
 * const result = Object.pickByValue(String.startsWith)({ foo: 'foo', baz: 'faz', quux: 'corge' })
 * //    ^? { foo: 'foo', baz: 'faz' }
 * ```
 */
export const pickByValue = ((f: Function.Function) =>
  (o: Record<PropertyKey, unknown>) => {
    const result = {} as Record<PropertyKey, unknown>

    for (const key in o) {
      if (f(o[key] as never) === true) {
        result[key] = o[key]
      }
    }

    return result
  }) as Kind._$reify<PickByValue>
