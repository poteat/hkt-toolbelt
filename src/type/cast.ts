import { Kind } from '..'

/**
 * `_$cast` is a type-level function that casts a type `T` to a type `U`.
 *
 * @template T - The type to cast.
 * @template U - The type to cast to.
 *
 * @example
 * type T0 = _$cast<true, true> // true
 * type T1 = _$cast<boolean, true> // true
 * type T2 = _$cast<true, boolean> // true
 */
export type _$cast<T, U> = T extends U ? T : U

interface Cast_T<T> extends Kind.Kind {
  f(x: this[Kind._]): _$cast<typeof x, T>
}

/**
 * `Cast` is an interface that extends `Kind.Kind`.
 * It is used in custom kind development to encode input constraints.
 */
export interface Cast extends Kind.Kind {
  f(x: this[Kind._]): Cast_T<typeof x>
}
