import { $, Type, Kind, Function } from '..'

/**
 * `_$map` is a type-level function that maps a type-level function over a list of types.
 *
 * @template F - The type-level function to map.
 * @template X - The list of types to map over.
 * @returns A list of types containing the results of mapping `F` over `X`.
 *
 * @example
 * type T0 = List._$map<$<Conditional.Equals, 'foo'>, ['foo', 'bar']> // [true, false]
 * type T1 = List._$map<$<Function.Constant, 'foo'>, ['foo', 'bar']> // ['foo', 'foo']
 */
export type _$map<F extends Kind.Kind, X extends unknown[]> = {
  [key in keyof X]: $<F, Type._$cast<X[key], Kind._$inputOf<F>>>
}

interface Map_T<F extends Kind.Kind> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$map<F, typeof x>
}

/**
 * `Map` is a type-level function that maps a type-level function over a list of types.
 *
 * @template T - The type-level function to map.
 * @template X - The list of types to map over.
 * @returns A list of types containing the results of mapping `F` over `X`.
 *
 * @example
 * type T0 = $<$<List.Map, $<Conditional.Equals, 'foo'>>, ['foo', 'bar']> // [true, false]
 * type T1 = $<$<List.Map, $<Function.Constant, 'foo'>>, ['foo', 'bar']> // ['foo', 'foo']
 */
export interface Map extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): Map_T<typeof x>
}

/**
 * Given a kind `F` and a list `X`, return a list of the results of applying
 * `F` to each element of `X`.
 *
 * @param {Kind.Kind} f - The kind to map over the list.
 * @param {unknown[]} x - The list to map over.
 *
 * @example
 * ```ts
 * import { List, Function } from "hkt-toolbelt";
 *
 * const result = List.map(Function.constant('foo'))(['foo', 'bar'])
 * //    ^? ['foo', 'foo']
 * ```
 */
export const map = ((f: Function.Function) => (x: unknown[]) =>
  x.map(f as never)) as Kind._$reify<Map>
