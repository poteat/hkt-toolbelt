import { Type, Kind } from '..'

/**
 * `_$not` is a type-level function that takes in a boolean type `T`, and
 * returns the boolean result of applying the 'not' logical operation on `T`.
 * If `T` is true, then `_$not` returns false, otherwise it returns true.
 *
 * @param T - A boolean type.
 *
 * @example
 * For example, we can use `_$not` to negate a boolean type:
 *
 * ```ts
 * import { Boolean } from "hkt-toolbelt";
 *
 * type Result = Boolean._$not<true>; // false
 * ```
 */
export type _$not<T extends boolean> = T extends true ? false : true

/**
 * `Not` is a type-level function that takes in a boolean type `T`, and
 * returns the boolean result of applying the 'not' logical operation on `T`.
 *
 * @param T - A boolean type.
 *
 * @example
 * For example, we can use `Not` to negate a boolean type:
 *
 * We apply `Not` to `true` using the `$` type-level applicator:
 *
 * ```ts
 * import { $, Boolean } from "hkt-toolbelt";
 *
 * type Result = $<Boolean.Not, true>; // false
 * ```
 */
export interface Not extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): _$not<typeof x>
}
