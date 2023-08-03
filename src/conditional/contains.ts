import { $, $$, Conditional, Kind } from "..";

/**
 * `_$contains` is a type-level function that takes in two types, `T` and `X`,
 * and returns a boolean value. `_$contains` will return `true` if `X` is a
 * supertype of `T`, otherwise it returns `false`.
 *
 * This function checks the converse of `_$extends`. 
 * While `_$extends` returns `true` if `X` -> `T` is true, 
 * `_$contains` will return `true` if and only if `X` <- `T` is true.
 * 
 * This is useful if it is known that `T` extends `X`, 
 * but the two arguments are being supplied in the opposite order expected by `_$extends`.
 *
 * ## Parameters
 *
 * @param T The subtype that we are checking if `X` contains.
 * @param X The type that we are checking if it is a supertype of `T`.
 *
 * ## Example
 *
 * @example
 *
 * For example, we can use `_$contains` to determine whether a type is a supertype
 * of another type. In this example, we are checking whether the type `boolean` is
 * a supertype of the type `true`:
 *
 * ```ts
 * import { Conditional } from "hkt-toolbelt";
 *
 * type Result = Conditional._$contains<true, boolean>; // true
 * ```
 *
 * Here, `boolean` is a supertype of `true`, so `_$contains` returns `true`.
 */
export type _$contains<T, X> = $$<[Conditional.Extends, $<Kind.Apply, T>], X>

interface Contains_T<T> extends Kind.Kind {
  f(x: this[Kind._]): _$contains<T, typeof x>;
}

/**
 * `Contains` is a type-level function that takes in two types, `T` and `U`, and
 * returns a boolean that represents whether `T` contains `U`.
 * 
 * This function checks the converse of `Extends`. 
 * While `Extends` returns `true` if `T` -> `U` is true, 
 * `Contains` will return `true` if and only if `T` <- `U` is true.
 * 
 * This is useful if it is known that `U` extends `T`, 
 * but the two arguments are being supplied in the opposite order expected by `Extends`.
 *
 * ## Parameters
 *
 * @param T The supertype that we are checking if `U` extends.
 * @param U The type that we are checking if it is a subtype of `T`.
 *
 * ## Example
 *
 * @example
 *
 * For example, we can use `Contains` to determine whether a type `T` contains a
 * type `U`. In this example, we test whether `boolean` contains `true`:
 *
 * We apply `Contains` to `true` and `boolean` respectively using the `$`
 * type-level applicator. This checks whether `boolean` contains `true`:
 *
 * ```ts
 * import { $, Conditional } from "hkt-toolbelt";
 *
 * type Result = $<$<Conditional.Contains, true>, boolean>; // true
 * ```
 *
 * In the following examples, we test whether a number contains a string:
 *
 * ```ts
 * import { $, Conditional } from "hkt-toolbelt";
 *
 * type Result = $<$<Conditional.Extends, number>, string>; // false
 * ```
 *
 * Unlike `extends`, TypeScript does not provide a native keyword that can be used to
 * perform a supertype check. While `extends` can only be used in a
 * conditional type, `Contains` is composable, so it can be used in more
 * sophisticated type-level functions.
 */
export interface Contains extends Kind.Kind {
  f(x: this[Kind._]): Contains_T<typeof x>;
}
