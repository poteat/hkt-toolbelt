import { Type, Kind } from '..'

/**
 * `_$inverseMapN` is a type-level function that takes in two inputs:
 * a list of type-level functions upon which to perform the map operation,
 * and a target list of arguments which will be passed into all of these functions using `$N`
 * It returns a list filled with the returned results of applying the functions to the arguments.
 *
 * @param T - A list of type-level functions that transform inputs and return the result.
 * @param X - A list of types. The arguments to be passed into every element of `T`.
 */
export type _$inverseMapN<T extends Kind.Kind[], X extends unknown[]> = {
  [key in keyof T]: Kind._$uncurry<T[key], X>
}

interface InverseMapN_T<T extends Kind.Kind[]> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$inverseMapN<T, typeof x>
}

/**
 * `InverseMapN` is a type-level function that takes in two inputs:
 * a list of type-level functions upon which to perform the map operation,
 * and a target list of arguments which will be passed into all of these functions using `$N`
 * It returns a list filled with the returned results of applying the functions to the arguments.
 *
 * @param T - A list of type-level functions that transform inputs and return the result.
 * @param X - A list of types. The arguments to be passed into every element of `T`.
 */
export interface InverseMapN extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind[]>): InverseMapN_T<typeof x>
}
