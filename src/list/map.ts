import { $, Type, Kind } from '..'

/**
 * `_$map` is a type-level function that maps a type-level function over a list of types.
 * 
 * @template T - The type-level function to map.
 * @template X - The list of types to map over.
 * 
 * @example
 * type T0 = _$map<$<Conditional.Equals, 'foo'>, ['foo', 'bar']> // [true, false]
 * type T1 = _$map<$<Function.Constant, 'foo'>, ['foo', 'bar']> // ['foo', 'foo']
 */
export type _$map<T extends Kind.Kind, X extends unknown[]> = {
  [key in keyof X]: $<T, Type._$cast<X[key], Kind._$inputOf<T>>>
}

/**
 * `Map_T` is an intermediate interface for currying.
 * 
 * @template T - The type-level function to map.
 */
interface Map_T<T extends Kind.Kind> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$map<T, typeof x>
}

/**
 * `Map` is a type-level function that maps a type-level function over a list of types.
 * 
 * @template T - The type-level function to map.
 * 
 * @example
 * type T0 = $<$<Map, $<Conditional.Equals, 'foo'>>, ['foo', 'bar']> // [true, false]
 * type T1 = $<$<Map, $<Function.Constant, 'foo'>>, ['foo', 'bar']> // ['foo', 'foo']
 */
export interface Map extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): Map_T<typeof x>
}
