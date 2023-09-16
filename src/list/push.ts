import { Type, Kind } from '..'

/**
 * `_$push` is a type-level function that pushes an element to the end of a tuple.
 *
 * @template X - The element to push.
 * @template T - The tuple to push the element to.
 *
 * @example
 * type T0 = List._$push<3, [1, 2]> // [1, 2, 3]
 * type T1 = List._$push<'foo', []> // ['foo']
 */
export type _$push<X, T extends unknown[]> = [...T, X]

interface Push_T<X> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$push<X, typeof x>
}

/**
 * `Push` is a type-level function that pushes an element to the end of a tuple.
 *
 * @template X - The element to push.
 * @template T - The tuple to push the element to.
 *
 * @example
 * type T0 = $<$<List.Push, 3>, [1, 2]> // [1, 2, 3]
 * type T1 = $<$<List.Push, 'foo'>, []> // ['foo']
 */
export interface Push extends Kind.Kind {
  f(x: this[Kind._]): Push_T<typeof x>
}
