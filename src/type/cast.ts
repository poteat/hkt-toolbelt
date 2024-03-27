import { Kind } from '..'

/**
 * `_$cast` is a generic type that coercively downcasts a type `T` to a type `U`.
 * Returns the narrower out of the two types. If the two types are unrelated, returns `U`.
 *
 * @template T - The type to cast.
 * @template U - The type to cast to.
 *
 * @example
 * type T0 = _$cast<true, true> // true
 * type T1 = _$cast<boolean, true> // true
 * type T2 = _$cast<true, boolean> // true
 * type T3 = _$cast<boolean, 0> // 0
 */
export type _$cast<T, U> = [T] extends [U] ? T : U

interface Cast_T<T> extends Kind.Kind {
  f(x: this[Kind._]): _$cast<typeof x, T>
}

/**
 * `Cast` is a type-level function that coercively downcasts a type `T` to a type `U`.
 * Returns the narrower out of the two types. If the two types are unrelated, returns `U`.
 *
 * @template T - The type to cast.
 * @template U - The type to cast to.
 *
 * @example
 * type T0 = $<$<Cast, true>, true> // true
 * type T1 = $<$<Cast, boolean>, true> // true
 * type T2 = $<$<Cast, true>, boolean> // true
 * type T3 = $<$<Cast, boolean>, 0> // 0
 */
export interface Cast extends Kind.Kind {
  f(x: this[Kind._]): Cast_T<typeof x>
}
