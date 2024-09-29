import { Kind, Type } from '..'

/**
 * `_$unionAll` is a type-level function that takes a tuple of types `T`, and
 * returns the union of all types in `T`.
 *
 * This is simply equivalent to `T[number]`.
 *
 * @template T - The tuple of types to union.
 *
 * @example
 * ```ts
 * type T0 = _$unionAll<[number, string]> // number | string
 * type T1 = _$unionAll<[string, string]> // string
 * ```
 */
export type _$unionAll<T extends unknown[]> = T[number]

/**
 * `UnionAll` is a type-level function that takes a tuple of types `T`, and
 * returns the union of all types in `T`.
 *
 * @template T - The tuple of types to union.
 *
 * @example
 * ```ts
 * type T0 = $<UnionAll, [number, string]> // number | string
 * type T1 = $<UnionAll, [string, string]> // string
 * ```
 */
export interface UnionAll extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$unionAll<typeof x>
}
