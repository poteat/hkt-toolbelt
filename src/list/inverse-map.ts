import { $, Type, Kind } from '..'

/**
 * `_$inverseMap` is a type-level function that takes in two inputs:
 * a list of type-level functions upon which to perform the map operation,
 * and a target type argument which will be passed into all of these functions.
 * It returns a list filled with the returned results of applying the functions to the argument.
 *
 * @param T A list of type-level functions that transform unary inputs and return the result.
 * @param X A type. The argument to be passed into every element of `T`.
 *
 * The type-level functions in `T` must be unary, curried `Kind` types as defined in this library.
 * @see {@link https://github.com/poteat/hkt-toolbelt/blob/main/docs/guides/custom-kinds.md} for details on how to create a custom kind.
 */
export type _$inverseMap<T extends Kind.Kind[], X> = {
  [key in keyof T]: $<T[key], Type._$cast<X, Kind._$inputOf<T[key]>>>
}

interface InverseMap_T<T extends Kind.Kind[]> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown>): _$inverseMap<T, typeof x>
}

/**
 * `InverseMap` is a type-level function that takes in two inputs:
 * a list of type-level functions upon which to perform the map operation,
 * and a target type argument which will be passed into all of these functions.
 * It returns a list filled with the returned results of applying the functions to the argument.
 *
 * @param T A list of type-level functions that transform unary inputs and return the result.
 * @param X A type. The argument to be passed into every element of `T`.
 *
 * The type-level functions in `T` must be unary, curried `Kind` types as defined in this library.
 * @see {@link https://github.com/poteat/hkt-toolbelt/blob/main/docs/guides/custom-kinds.md} for details on how to create a custom kind.
 */
export interface InverseMap extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind[]>): InverseMap_T<typeof x>
}
