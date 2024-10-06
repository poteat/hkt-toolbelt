import { Kind, Type } from '..'

/**
 * `_$defaults` is a type-level function that takes in a record `D` and a record
 * `O`, and returns a new record which includes all keys from `D` that are not
 * present in `O`, as well as existing keys from `O`.
 *
 * Keys in `D` that already have corresponding values in `O` are ignored.
 *
 * @template {Record<PropertyKey, unknown>} D - The default values to use.
 * @template {Record<PropertyKey, unknown>} O - The object to defaultize.
 *
 * @example
 * ```ts
 * type T0 = _$defaults<{ foo: 'qux'; qux: 'qux';}, { foo: 'bar', bar: 'foo'}>
 * //    ^? { foo: 'bar', bar: 'foo', qux: 'qux' }
 * ```
 */
export type _$defaults<
  D extends Record<PropertyKey, unknown>,
  O extends Record<PropertyKey, unknown>
> = {
  [key in keyof D | keyof O]: key extends keyof O ? O[key] : D[key]
}

interface Defaults_T<D extends Record<PropertyKey, unknown>> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<PropertyKey, unknown>>
  ): _$defaults<D, typeof x>
}

/**
 * `Defaults` is a type-level function that takes in a record `D` and a record
 * `O`, and returns a new record which includes all keys from `D` that are not
 * present in `O`, as well as existing keys from `O`.
 *
 * Keys in `D` that already have corresponding values in `O` are ignored.
 *
 * @template {Record<PropertyKey, unknown>} D - The default values to use.
 * @template {Record<PropertyKey, unknown>} O - The object to defaultize.
 *
 * @example
 * ```ts
 * type T0 = $<$<Object.Defaults, { foo: 'qux'; qux: 'qux';}>, { foo: 'bar', bar: 'foo'}>
 * //    ^? { foo: 'bar', bar: 'foo', qux: 'qux' }
 * ```
 */
export interface Defaults extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<PropertyKey, unknown>>
  ): Defaults_T<typeof x>
}

/**
 * Given a record of default values and a record to defaultize, return a new
 * record which includes all keys from `D` that are not present in `O`, as well
 * as existing keys from `O`.
 *
 * Keys in `D` that already have corresponding values in `O` are ignored.
 *
 * @param {Record<PropertyKey, unknown>} d - The default values to use.
 * @param {Record<PropertyKey, unknown>} o - The object to defaultize.
 *
 * @example
 * ```ts
 * import { Object } from "hkt-toolbelt";
 *
 * const result = Object.defaults({ foo: 'qux', qux: 'qux' })({ foo: 'bar', bar: 'foo' })
 * //    ^? { foo: 'bar', bar: 'foo', qux: 'qux' }
 * ```
 */
export const defaults = ((d: Record<PropertyKey, unknown>) =>
  (o: Record<PropertyKey, unknown>) => {
    const result = {} as Record<PropertyKey, unknown>

    for (const key in d) {
      if (!(key in o)) {
        result[key] = d[key]
      }
    }

    for (const key in o) {
      result[key] = o[key]
    }

    return result
  }) as Kind._$reify<Defaults>
