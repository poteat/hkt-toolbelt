import { $, Kind, Type } from '..'

/**
 * `Object._$mapValues` is a type-level function that maps the values of an object.
 * 
 * @template T - The object to map.
 * @template F - The function to apply to each value.
 * 
 * @example
 * type T0 = Object._$mapValues<{ a: 'foo'; b: 'bar'; c: 'baz' }, String.ToUpper> // { a: 'FOO'; b: 'BAR'; c: 'BAZ' }
 */
export type _$mapValues<
  T extends Record<string, unknown>,
  F extends Kind.Kind
> = {
  [key in keyof T]: $<F, Type._$cast<T[key], Kind._$inputOf<F>>>
}

/**
 * `Object.MapValues_T` is an intermediate interface for currying.
 * 
 * @template F - The function to apply to each value.
 */
interface MapValues_T<F extends Kind.Kind> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<string, Kind._$inputOf<F>>>
  ): _$mapValues<typeof x, F>
}

/**
 * `Object.MapValues` is a type-level function that maps the values of an object.
 * 
 * @template T - The object to map.
 * @template F - The function to apply to each value.
 * 
 * @example
 * type T0 = $<$<Object.MapValues, String.ToUpper>, { a: 'foo'; b: 'bar'; c: 'baz' }> // { a: 'FOO'; b: 'BAR'; c: 'BAZ' }
 */
export interface MapValues extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): MapValues_T<typeof x>
}
