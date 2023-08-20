import { Kind } from '..'

type _$toIntersection2<T> = (
  T extends unknown ? (x: T) => unknown : never
) extends (x: infer X) => void
  ? X
  : never

/**
 * `_$toIntersection` is a type-level function that converts a type to an intersection type.
 * It handles boolean types separately.
 * 
 * @template T - The type to convert to an intersection type.
 * 
 * @example
 * type T0 = _$toIntersection<{ a: 'foo' } | { b: 'foo' }> // { a: 'foo'; b: 'foo' }
 * type T1 = _$toIntersection<number | string> // never
 */
export type _$toIntersection<T> = boolean extends T
  ? boolean & _$toIntersection2<Exclude<T, boolean>>
  : _$toIntersection2<T>

/**
 * `ToIntersection` is a type-level function that converts a type to an intersection type.
 * 
 * @template T - The type to convert to an intersection type.
 * 
 * @example
 * type T0 = $<ToIntersection, { a: 'foo' } | { b: 'foo' }> // { a: 'foo'; b: 'foo' }
 */
export interface ToIntersection extends Kind.Kind {
  f(x: this[Kind._]): _$toIntersection<this[Kind._]>
}
