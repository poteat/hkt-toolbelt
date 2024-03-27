import { Kind } from '..'

/**
 * `_$assert` is a generic type that casts a type `T` to a type `U`, but only if `U` is a narrower or wider version of `T`.
 * If an impossible coercion to an unrelated type is attempted, it returns `never`.
 *
 * This behavior is modeled after TypeScript's type assertion using the `as` operator.
 * @see {@link Type._$cast} for a more permissive version of this type that only performs downcasts or coercions to unrelated types.
 *
 * @template T - The type to assert.
 * @template U - The type to assert to.
 *
 * @example
 * type T0 = _$assert<true, true> // true
 * type T1 = _$assert<boolean, true> // true
 * type T2 = _$assert<true, boolean> // boolean
 * type T3 = _$assert<boolean, 0> // never
 */
export type _$assert<T, U> = [T] extends [U] ? U : [U] extends [T] ? U : never

interface Assert_T<T> extends Kind.Kind {
  f(x: this[Kind._]): _$assert<typeof x, T>
}

/**
 * `Assert` is a type-level function that casts a type `T` to a type `U`, but only if `U` is a more or less specific version of `T`.
 * If an impossible coercion to an unrelated type is attempted, it returns `never`.
 *
 * This behavior is modeled after TypeScript's type assertion using the `as` operator.
 * @see {@link Type._$cast} for a more permissive version of this function that only performs downcasts or coercions to unrelated types.
 *
 * @template T - The type to assert.
 * @template U - The type to assert to.
 *
 * @example
 * type T0 = $<$<Assert, true>, true> // true
 * type T1 = $<$<Assert, boolean>, true> // true
 * type T2 = $<$<Assert, true>, boolean> // boolean
 * type T3 = $<$<Assert, boolean>, 0> // never
 */
export interface Assert extends Kind.Kind {
  f(x: this[Kind._]): Assert_T<typeof x>
}
