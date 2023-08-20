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
 * `Cast` is a type-level function that casts a type `T` to a type `U`.
 *
 * @template T - The type to cast.
 * @template U - The type to cast to.
 *
 * @example
 * type T0 = $<$<Cast, true>, true> // true
 * type T1 = $<$<Cast, boolean>, true> // true
 * type T2 = $<$<Cast, true>, boolean> // true
 */
export interface Cast extends Kind.Kind {
  f(x: this[Kind._]): Cast_T<typeof x>
}
