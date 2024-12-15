import { Kind, Type, Number as Number_ } from '..'

/**
 * `_$negate` is a type-level function that takes in an integer `T`, and
 * returns the integer negation of `T`.
 *
 * @template {number} T - An integer.
 *
 * @example
 * ```ts
 * import { Integer } from "hkt-toolbelt";
 *
 * type Result = Integer._$negate<42>; // -42
 * ```
 */
export type _$negate<
  T extends Number_.Number,
  NEG extends Number_.Number = Number_._$negate<T>
> = NEG

/**
 * `Negate` is a type-level function that takes in an integer `T`, and
 * returns the integer negation of `T`.
 *
 * @template {number} T - An integer.
 *
 * @example
 * ```ts
 * import { $, Integer } from "hkt-toolbelt";
 *
 * type Result = $<Integer.Negate, 42>; // -42
 * ```
 */
export interface Negate extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number_.Number>): _$negate<typeof x>
}

/**
 * Given an integer, return its negation.
 *
 * @param {number} x - The integer to negate.
 *
 * @example
 * ```ts
 * import { Integer } from "hkt-toolbelt";
 *
 * const result = Integer.negate(42)
 * //    ^? -42
 * ```
 */
export const negate = ((x: Number_.Number) =>
  Number(x) === 0 ? 0 : -Number(x)) as Kind._$reify<Negate>
