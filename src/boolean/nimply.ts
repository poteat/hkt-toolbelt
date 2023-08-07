import { Kind, Type } from '..'

/**
 * `_$nimply` is a type-level function that takes in two boolean types, `T` and
 * `U`, and returns the boolean result of applying the 'not-implies' logical
 * operation on `T` and `U`. If `T` is true and `U` is false, then `_$nimply`
 * returns true, otherwise it returns false.
 *
 * @param T A boolean type.
 * @param U A boolean type.
 *
 * @example
 * For example, we can use `_$nimply` to determine whether two boolean types
 * follow the 'not-implies' logical operation. In this example, `true` and
 * `false` are passed as type arguments to the type-level function:
 *
 * ```ts
 * import { Boolean } from "hkt-toolbelt";
 *
 * type Result = Boolean._$nimply<true, false>; // true
 * ```
 */
export type _$nimply<T extends boolean, U extends boolean> = [T, U] extends [
  true,
  false
]
  ? true
  : false

interface Nimply_T<T extends boolean> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): _$nimply<T, typeof x>
}

/**
 * `Nimply` is a type-level function that takes in two boolean types, `T` and
 * `U`, and returns the boolean result of applying the 'not-implies' logical
 * operation on `T` and `U`.
 *
 * @param T A boolean type.
 * @param U A boolean type.
 *
 * @example
 * For example, we can use `Nimply` to determine whether two boolean types
 * follow the 'not-implies' logical operation. In this example, `true` and
 * `false` are passed as type arguments to the type-level function:
 *
 * We apply `Nimply` to `true` and `false` respectively using the `$` type-level
 * applicator:
 *
 * ```ts
 * import { $, Boolean } from "hkt-toolbelt";
 *
 * type Result = $<$<Boolean.Nimply, true>, false>; // true
 * ```
 */
export interface Nimply extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): Nimply_T<typeof x>
}
