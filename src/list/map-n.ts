import { $N, Type, Kind } from '..'

/**
 * `_$mapN` is a type-level function that takes in two inputs:
 * a partially-applied type-level function that expects more arguments,
 * and a target list of lists upon which to map the function using the `$N` operator.
 * It returns a mapped list of types.
 *
 * @see {@link $N}
 *
 * The type-level function input can be a fully or partially uncurried `Kind`.
 *
 * @param F - A type-level function that can be uncurried and applied to a list of arguments.
 * @param X - A list of lists of arguments. The target of the map operation.
 *
 * @returns a mapped list of types
 */
export type _$mapN<T extends Kind.Kind, X extends unknown[][]> = {
  [key in keyof X]: $N<T, X[key]>
}

interface MapN_T<T extends Kind.Kind> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[][]>): _$mapN<T, typeof x>
}

/**
 * `_$MapN` is a type-level function that takes in two inputs:
 * a partially-applied type-level function that expects more arguments,
 * and a target list of lists upon which to map the function using the `$N` operator.
 * It returns a mapped list of types.
 *
 * @see {@link $N}
 *
 * The type-level function input can be a fully or partially uncurried `Kind`.
 *
 * @param F - A type-level function that can be uncurried and applied to a list of arguments.
 * @param X - A list of lists of arguments. The target of the map operation.
 *
 * @returns a mapped list of types
 */
export interface MapN extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): MapN_T<typeof x>
}
