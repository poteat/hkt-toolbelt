import { Type, Kind } from '..';

/**
 * `_$nor` is a type-level function that takes in two boolean types, `T` and
 * `U`, and returns the boolean result of applying the 'nor' logical operation
 * on `T` and `U`. If both `T` and `U` are false, then `_$nor` returns true,
 * otherwise it returns false.
 *
 * @param T A boolean type.
 * @param U A boolean type.
 *
 * @example
 * For example, we can use `_$nor` to determine whether two boolean types are
 * both false. In this example, `true` and `true` are passed as type arguments
 * to the type-level function:
 *
 * ```ts
 * import { Boolean } from "hkt-toolbelt";
 *
 * type Result = Boolean._$nor<true, true>; // false
 * ```
 */
export type _$nor<T extends boolean, U extends boolean> = [T, U] extends [
  false,
  false
]
  ? true
  : false;

interface Nor_T<T extends boolean> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): _$nor<T, typeof x>;
}

/**
 * `Nor` is a type-level function that takes in two boolean types, `T` and
 * `U`, and returns the boolean result of applying the 'nor' logical operation
 * on `T` and `U`.
 *
 * @param T A boolean type.
 * @param U A boolean type.
 *
 * @example
 * For example, we can use `Nor` to determine whether two boolean types are both
 * false. In this example, `true` and `true` are passed as type arguments to the
 * type-level function:
 *
 * We apply `Nor` to `true` and `true` respectively using the `$` type-level
 * applicator:
 *
 * ```ts
 * import { $, Boolean } from "hkt-toolbelt";
 *
 * type Result = $<$<Boolean.Nor, true>, true>; // false
 * ```
 */
export interface Nor extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): Nor_T<typeof x>;
}
