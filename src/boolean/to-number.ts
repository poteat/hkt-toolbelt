import { Kind, Type } from '..'

/**
 * `_$toNumber` is a type-level function that takes in a boolean `B` and returns
 * either `1` or `0`.
 *
 * @template {boolean} B - The boolean to convert to a number.
 *
 * @example
 * ```ts
 * type T0 = _$toNumber<true> // 1
 * type T1 = _$toNumber<false> // 0
 * ```
 */
export type _$toNumber<B extends boolean> = B extends true ? 1 : 0

/**
 * `ToNumber` is a type-level function that takes in a boolean `B` and returns
 * either `1` or `0`.
 *
 * @template {boolean} B - The boolean to convert to a number.
 *
 * @example
 * ```ts
 * type T0 = $<Boolean.ToNumber, true> // 1
 * type T1 = $<Boolean.ToNumber, false> // 0
 * ```
 */
export interface ToNumber extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): _$toNumber<typeof x>
}

/**
 * Given a boolean, return either 1 or 0.
 *
 * @param {boolean} b - The boolean to convert.
 *
 * @example
 * ```ts
 * import { Boolean } from "hkt-toolbelt";
 *
 * const result = Boolean.toNumber(true)
 * //    ^? 1
 * ```
 */
export const toNumber = ((b: boolean) => (b ? 1 : 0)) as Kind._$reify<ToNumber>
