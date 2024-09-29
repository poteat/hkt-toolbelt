import { Kind, Type } from '..'

/**
 * `_$intersectAll` is a type-level function that takes a tuple of types `T`, and
 * returns the intersection of all types in `T`.
 *
 * @template T - The tuple of types to intersect.
 *
 * @example
 * ```ts
 * type T0 = _$intersectAll<[number, string]> // number & string
 * type T1 = _$intersectAll<[string, string]> // string
 * ```
 */
export type _$intersectAll<T extends unknown[], O = unknown> = T extends [
  infer Head,
  ...infer Tail
]
  ? _$intersectAll<Tail, Head & O>
  : O

/**
 * `IntersectAll` is a type-level function that takes a tuple of types `T`, and
 * returns the intersection of all types in `T`.
 *
 * @template T - The tuple of types to intersect.
 *
 * @example
 * ```ts
 * type T0 = $<IntersectAll, [number, string]> // number & string
 * type T1 = $<IntersectAll, [string, string]> // string
 * ```
 */
export interface IntersectAll extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$intersectAll<typeof x>
}
