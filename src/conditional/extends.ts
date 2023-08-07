import { Kind } from "..";

/**
 * `_$extends` is a type-level function that takes in two types, `T` and `X`,
 * and returns a boolean value. `_$extends` will return `true` if `X` is a
 * subtype of `T`, otherwise it returns `false`.
 *
 * This type-level function uses a conditional type to perform the subtype
 * check. If `X` extends `unknown` (i.e. `unknown extends X` is true), then
 * `X` is returned. Otherwise, `never` is returned. This conditional type
 * ensures that we are only checking if `X` is a subtype of `T`, rather than
 * checking if `T` is a subtype of `X`.
 *
 * ## Parameters
 *
 * @param T The supertype that we are checking if `X` extends.
 * @param X The type that we are checking if it is a subtype of `T`.
 *
 * ## Example
 *
 * @example
 * For example, we can use `_$extends` to determine whether a type is a subtype
 * of another type. In this example, we are checking whether the type `true` is
 * a subtype of the type `boolean`:
 *
 * ```ts
 * import { Conditional } from "hkt-toolbelt";
 *
 * type Result = Conditional._$extends<boolean, true>; // true
 * ```
 *
 * Here, `true` is a subtype of `boolean`, so `_$extends` returns `true`.
 */
export type _$extends<T, X> = (X extends unknown ? X : never) extends T
  ? true
  : false;

interface Extends_T<T> extends Kind.Kind {
  f(x: this[Kind._]): _$extends<T, typeof x>;
}

/**
 * `Extends` is a type-level function that takes in two types, `T` and `U`, and
 * returns a boolean that represents whether `T` extends `U`.
 *
 * ## Parameters
 *
 * @param T The supertype that we are checking if `U` extends.
 * @param U The type that we are checking if it is a subtype of `T`.
 *
 * ## Example
 *
 * @example
 * For example, we can use `Extends` to determine whether a type `T` extends a
 * type `U`. In this example, we test whether `true` extends `boolean`:
 *
 * We apply `Extends` to `boolean` and `true` respectively using the `$`
 * type-level applicator. This checks whether `true` extends `boolean`:
 *
 * ```ts
 * import { $, Conditional } from "hkt-toolbelt";
 *
 * type Result = $<$<Conditional.Extends, boolean>, true>; // true
 * ```
 *
 * In the following examples, we test whether a string extends a number:
 *
 * ```ts
 * import { $, Conditional } from "hkt-toolbelt";
 *
 * type Result = $<$<Conditional.Extends, number>, string>; // false
 * ```
 *
 * Note that TypeScript provides its own `extends` keyword that can be used to
 * perform a subtype check. However, `extends` can only be used in a
 * conditional type. `Extends` is composable, so it can be used in more
 * sophisticated type-level functions.
 */
export interface Extends extends Kind.Kind {
  f(x: this[Kind._]): Extends_T<typeof x>;
}
