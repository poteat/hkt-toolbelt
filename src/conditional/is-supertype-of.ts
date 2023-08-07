import { $, $$, Conditional, Kind } from '..';

/**
 * `_$isSupertypeOf` is a type-level function that takes in two types, `T` and `X`,
 * and returns a boolean value. `_$isSupertypeOf` will return `true` if `X` is a
 * supertype of `T`, otherwise it returns `false`.
 *
 * This function checks the converse of `_$extends`.
 * While `_$extends` returns `true` if `X` -> `T` is true,
 * `_$isSupertypeOf` will return `true` if and only if `X` <- `T` is true.
 *
 * This is useful if it is known that `T` extends `X`,
 * but the two arguments are being supplied in the opposite order expected by `_$extends`.
 *
 * @param T The subtype that we are checking if `X` is a supertype of.
 * @param X The type that we are checking if it is a supertype of `T`.
 *
 * @example
 * For example, we can use `_$isSupertypeOf` to determine whether a type is a supertype
 * of another type. In this example, we are checking whether the type `boolean` is
 * a supertype of the type `true`:
 *
 * ```ts
 * import { Conditional } from "hkt-toolbelt";
 *
 * type Result = Conditional._$isSupertypeOf<true, boolean>; // true
 * ```
 *
 * Here, `boolean` is a supertype of `true`, so `_$isSupertypeOf` returns `true`.
 */
export type _$isSupertypeOf<T, X> = $$<
  [Conditional.Extends, $<Kind.Apply, T>],
  X
>;

interface IsSupertypeOf_T<T> extends Kind.Kind {
  f(x: this[Kind._]): _$isSupertypeOf<T, typeof x>;
}

/**
 * `IsSupertypeOf` is a type-level function that takes in two types, `T` and `U`, and
 * returns a boolean that represents whether `T` is a supertype of `U`.
 *
 * This function checks the converse of `Extends`.
 * While `Extends` returns `true` if `T` -> `U` is true,
 * `IsSupertypeOf` will return `true` if and only if `T` <- `U` is true.
 *
 * This is useful if it is known that `U` extends `T`,
 * but the two arguments are being supplied in the opposite order expected by `Extends`.
 *
 * @param T The supertype that we are checking if `U` extends.
 * @param U The type that we are checking if it is a subtype of `T`.
 *
 * @example
 * For example, we can use `IsSupertypeOf` to determine whether a given type `T` is a supertype of
 * another type `U`. In this example, we test whether `boolean` is a supertype of `true`:
 *
 * We apply `IsSupertypeOf` to `true` and `boolean` respectively using the `$`
 * type-level applicator. This checks whether `boolean` is a supertype of `true`:
 *
 * ```ts
 * import { $, Conditional } from "hkt-toolbelt";
 *
 * type Result = $<$<Conditional.IsSupertypeOf, true>, boolean>; // true
 * ```
 *
 * In the following examples, we test whether a number is a supertype of a string:
 *
 * ```ts
 * import { $, Conditional } from "hkt-toolbelt";
 *
 * type Result = $<$<Conditional.Extends, number>, string>; // false
 * ```
 *
 * TypeScript does not provide a native keyword like `extends` that can be used to
 * perform a supertype check. While `extends` can only be used in a
 * conditional type, `IsSupertypeOf` is composable, so it can be used in more
 * sophisticated type-level functions.
 */
export interface IsSupertypeOf extends Kind.Kind {
  f(x: this[Kind._]): IsSupertypeOf_T<typeof x>;
}
