import { Kind } from '..'

/**
 * `_$cast` is a type-level function that casts a type `T` to a type `U`.
 * It is used in custom kind development to encode input constraints.
 * 
 * @template T - The type to cast.
 * @template U - The type to cast to.
 * 
 * @example
 * type T0 = _$cast<123, string> // Causes a type error
 * type T1 = _$cast<'hello', string> // 'hello'
 */
export type _$cast<T, U> = T extends U ? T : U

/**
 * `Cast_T` is an interface that extends `Kind.Kind`.
 * It is used in custom kind development to encode input constraints.
 * 
 * @template T - The type to cast.
 */
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
