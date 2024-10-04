import { Kind, Type } from '..'

/**
 * `_$and` is a type-level function that takes in two boolean types, `T` and
 * `U`, and returns the boolean result of applying the 'and' logical operation
 * on `T` and `U`. If both `T` and `U` are true, then `_$and` returns true,
 * otherwise it returns false.
 *
 * @template {boolean} T - A boolean type.
 * @template {boolean} U - A boolean type.
 *
 * @example
 * For example, we can use `_$and` to determine whether two boolean types are
 * both true. In this example, `true` and `false` are passed as type arguments
 * to the type-level function:
 *
 * ```ts
 * import { Boolean } from "hkt-toolbelt";
 *
 * type Result = Boolean._$and<true, false>; // false
 * ```
 */
export type _$and<T extends boolean, U extends boolean> = [T, U] extends [
  true,
  true
]
  ? true
  : false

interface And_T<T extends boolean> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): _$and<T, typeof x>
}

/**
 * `And` is a type-level function that takes in two boolean types, `T` and
 * `U`, and returns the boolean result of applying the 'and' logical operation
 * on `T` and `U`.
 *
 * @template {boolean} T - A boolean type.
 * @template {boolean} U - A boolean type.
 *
 * @example
 * For example, we can use `And` to determine whether two boolean types are
 * both true. In this example, `true` and `false` are passed as type arguments
 * to the type-level function:
 *
 * We apply `And` to `true` and `false` respectively using the `$` type-level
 * applicator:
 *
 * ```ts
 * import { $, Boolean } from "hkt-toolbelt";
 *
 * type Result = $<$<Boolean.And, true>, false>; // false
 * ```
 */
export interface And extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): And_T<typeof x>
}

/**
 * Given two booleans, return whether both are true.
 *
 * @param {boolean} a - The first boolean.
 * @param {boolean} b - The second boolean.
 *
 * @example
 * ```ts
 * import { Boolean } from "hkt-toolbelt";
 *
 * const result = Boolean.and(true)(false)
 * //    ^? false
 * ```
 */
export const and = ((a: boolean) => (b: boolean) => a && b) as Kind._$reify<And>
