import { Kind, Union } from '..'

/**
 * `_$toList` is a type-level function that converts a union type to a list (tuple) type.
 * 
 * @template T - The union type to convert to a list.
 * @template O - An optional parameter for internal use.
 * 
 * @example
 * type T0 = _$toList<1 | 2 | 3> // [1, 2, 3]
 * type T1 = _$toList<string | boolean> // [string, boolean]
 */
export type _$toList<T, O extends unknown[] = []> = Union._$toIntersection<
  T extends unknown ? (t: T) => T : never
> extends (x: never) => infer X
  ? _$toList<Exclude<T, X>, [X, ...O]>
  : O

/**
 * `ToList` is a type-level function that converts a union type to a list (tuple) type.
 * 
 * @template T - The union type to convert to a list.
 * 
 * @example
 * type T0 = $<ToList, 1 | 2 | 3> // [1, 2, 3]
 * type T1 = $<ToList, string | boolean> // [string, boolean]
 */
export interface ToList extends Kind.Kind {
  f(x: this[Kind._]): _$toList<this[Kind._]>
}
