import { Kind, Type, Union } from '..'

/**
 * `_$paths2` is a type-level function that returns the paths to all values in an object as a tuple.
 * 
 * @template T - The object to get the paths of.
 * @template O - The current path.
 */
type _$paths2<T, O extends unknown[] = []> =
  | {
      [K in keyof T]: T[K] extends Record<string, unknown>
        ? _$paths2<T[K], [...O, K]>
        : [...O, K]
    }[keyof T]
  | O

/**
 * `_$paths` is a type-level function that returns the paths to all values in an object as a tuple.
 * 
 * @template T - The object to get the paths of.
 * @template U - The paths of the object.
 */
export type _$paths<T, U = _$paths2<T>> = Union._$toList<
  U extends [] ? never : U
>

/**
 * `Paths` is a type-level function that returns the paths to all values in an object as a tuple.
 * 
 * @template x - The object to get the paths of.
 */
export interface Paths extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Record<string, unknown>>): _$paths<typeof x>
}
